type Donuts = "donuts";
type Baguettes = "baguettes";
type Food = Donuts | Baguettes;

function randomFood(): Food {
  if (Math.random() < 0.5) {
    return "donuts";
  } else {
    return "baguettes";
  }
}



type Maker<T> = () => T;

const makerOfDonuts: Maker<Donuts> = () => "donuts";

const makerOfFood: Maker<Food> = () => randomFood();

// Maker<Donuts> -> Maker<Food>
// const a: Maker<Food> = makerOfDonuts;

// Maker<Food> -> Maker<Donuts>
// const b: Maker<Donuts> = makerOfFood;



type Eater<T> = (item: T) => void;

const eaterOfDonuts: Eater<Donuts> = (item: Donuts) => console.log("yum, " + item);

const eaterOfFood: Eater<Food> = (item: Food) => console.log("yum, " + item);

// Eater<Donuts> -> Eater<Food>
// const c: Eater<Food> = eaterOfDonuts;

// Eater<Food> -> Eater<Donuts>
// const d: Eater<Donuts> = eaterOfFood;



type MakerEater<T> = (item: T) => T;

const makerEaterOfDonuts: MakerEater<Donuts> = (item: Donuts) => item;

const makerEaterOfFood: MakerEater<Food> = (item: Food) => item;

// MakerEater<Donuts> -> MakerEater<Food>
// const e: MakerEater<Food> = makerEaterOfDonuts;

// MakerEater<Food> -> MakerEater<Donuts>
// const f: MakerEater<Donuts> = makerEaterOfFood;



type MakerEaterIntersection = MakerEater<Donuts> & MakerEater<Food>;

// const g: MakerEaterIntersection = 
