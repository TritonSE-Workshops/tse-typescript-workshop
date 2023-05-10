// Type-level implementation of the factorial function.

type ArrayOfLength<N, A extends number[] = []> =
  A["length"] extends N
    ? A
    : ArrayOfLength<N, [...A, A["length"]]>;

type LengthFive = ArrayOfLength<5>;


type ArrayAdd<A extends number[], B extends number[]> = [...A, ...B];

type AddFiveTwo = ArrayAdd<ArrayOfLength<5>, ArrayOfLength<2>>;


type ArrayDec<A extends number[]> =
  A extends [...infer B extends number[], infer _]
    ? B
    : [];

type DecFive = ArrayDec<ArrayOfLength<5>>;


type ArrayMul<A extends number[], B extends number[]> =
  B extends []
    ? []
    : B extends [infer _, ...infer C extends number[]]
      ? [...A, ...ArrayMul<A, C>]
      : never;

type MulFiveThree = ArrayMul<ArrayOfLength<5>, ArrayOfLength<3>>;


type ArrayFac<A extends number[]> =
  A extends []
    ? ArrayOfLength<1>
    : ArrayMul<A, ArrayFac<ArrayDec<A>>>;

type FacFour = ArrayFac<ArrayOfLength<4>>["length"];
