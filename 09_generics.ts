function pickRandom<T>(values: T[]): T {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

const dieRoll = pickRandom<number>([1, 2, 3, 4, 5, 6]);

// const shirt = pickRandom(["blue", "gray", "slate"]);



function pickRandom2<T>(values: T): T[number] {
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

const dieRoll2 = pickRandom2([1, 2, 3, 4, 5, 6]);

const shirt2 = pickRandom2(["blue", "gray", "slate"]);
