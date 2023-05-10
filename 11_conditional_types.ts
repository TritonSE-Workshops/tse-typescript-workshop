type Length<T> = T extends { length: number } ? number : undefined;

type StringLength = Length<string>;
type ArrayLength = Length<string[]>;
type BooleanLength = Length<boolean>;
type BigLength = Length<{ length: bigint }>;
