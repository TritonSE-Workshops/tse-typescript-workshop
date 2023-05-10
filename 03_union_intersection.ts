type HTTPStatus = 200 | 201 | 400 | 401 | 403 | 404;

const created: HTTPStatus = 201;



type Description = string | null;

const noDescription: Description = null;
const disclaimer: Description = "parachute not included";



type Drink = "coffee" | "tea" | "boba" | "water";

type Free = "water" | "air" | "sunshine";

type FreeDrink = Free & Drink;
