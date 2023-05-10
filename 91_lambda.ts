// A type-level lambda calculus interpreter.

// Substitute value V for variable X in expression E.
type Sub<X extends string, V, E> =
  // Substitute V for X.
  E extends X
    ? V
    // Substitute both sides of applications.
    : E extends [infer E1, infer E2]
      ? [Sub<X, V, E1>, Sub<X, V, E2>]
      // Don't substitute in abstractions where the binder has the same name.
      : E extends Record<X, unknown>
        ? E
        // Substitute in abstractions where the binder has a different name.
        : E extends Record<infer Y extends string, infer B>
          ? Record<Y, Sub<X, V, B>>
          // Leave other variables unchanged.
          : E extends string
            ? E
            : "SubError";

// Get the free variables in an expression.
type FreeVars<E> =
  E extends [infer E1, infer E2]
    ? FreeVars<E1> | FreeVars<E2>
    : E extends Record<infer X extends string, infer B>
      ? Exclude<FreeVars<B>, X>
      : E extends string
        ? E
        : "FreeVarsError";

// Get the bound variables in an expression.
type BoundVars<E> =
  E extends [infer E1, infer E2]
    ? BoundVars<E1> | BoundVars<E2>
    : E extends Record<infer X extends string, infer B>
      ? X | BoundVars<B>
      : E extends string
        ? never
        : "BoundVarsError";

// Alpha rename all the bound variables in an expression.
type Rename<E> =
  E extends [infer E1, infer E2]
    ? [Rename<E1>, Rename<E2>]
    : E extends Record<infer X extends string, infer B>
      ? Record<`${X}'`, Rename<Sub<X, `${X}'`, B>>>
      : E extends string
        ? E
        : "RenameError";

// Evaluate an expression.
type Eval<E> =
  E extends [infer E1, infer E2]
    // If the left side of an application evaluates to an abstraction...
    ? Eval<E1> extends Record<infer X extends string, infer B>
      // If variable capture cannot occur,
      ? (BoundVars<B> & FreeVars<E2>) extends never
        // substitute the argument into the body of the abstraction,
        ? Eval<Sub<X, E2, B>>
        // otherwise rename all the bound variables in the body and try again.
        : Eval<[Record<X, Rename<B>>, E2]>
      // ...otherwise reduce the argument.
      : [Eval<E1>, Eval<E2>]
    // Evaluate the bodies of abstractions.
    : E extends Record<infer X extends string, infer B>
      ? Record<X, Eval<B>>
      // Variables are unchanged.
      : E extends string
        ? E
        : "EvalError";

// Desugar n-ary applications: ["x", "y", "z"] becomes [["x", "y"], "z"].
type Desugar<E> =
  // Recursively desugar each side of a binary application.
  E extends [infer E1, infer E2]
    ? [Desugar<E1>, Desugar<E2>]
    // Desugar n-ary applications to binary applications.
    : E extends [infer E1, infer E2, ...infer EM, infer EL]
      ? [Desugar<[E1, E2, ...EM]>, Desugar<EL>]
      // Recursively desugar abstraction bodies.
      : E extends Record<infer X extends string, infer B>
        ? Record<X, Desugar<B>>
        // Do nothing for variables.
        : E extends string
          ? E
          : "DesugarError";

// Convert an expression to a string.
type Stringify<E> =
  E extends string
    ? E
    : E extends Record<infer X extends string, infer B>
      ? `(λ${X}.${Stringify<B>})`
      : E extends [infer E1, infer E2]
        ? `(${Stringify<E1>} ${Stringify<E2>})`
        : "StringifyError";

type Run<E> = Stringify<Eval<Desugar<E>>>;

// Write variable x as "x", abstraction \x -> E as {x: E}, and application E1 E2 as [E1, E2].
// [E1, E2, E3] is syntax sugar for [[E1, E2], E3].

type True = {x: {y: "x"}};
type False = {x: {y: "y"}};
type IfThenElse = {b: {x: {y: ["b", "x", "y"]}}};

type TestIfThenElse = Run<[IfThenElse, True, "a", "b"]>;

type Zero = {f: {x: "x"}};
type One = {f: {x: ["f", "x"]}};
type Two = {f: {x: ["f", ["f", "x"]]}};

type Inc = {n: {f: {x: ["f", ["n", "f", "x"]]}}};

type IncZero = Run<[Inc, Zero]>;
type IncOne = Run<[Inc, One]>;
type IncTwo = Run<[Inc, Two]>;

type Four = Run<[Two, Inc, Two]>;
