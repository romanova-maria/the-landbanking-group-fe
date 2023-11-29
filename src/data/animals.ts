export type AnimalName = (typeof wildAnimals)[number];
export const wildAnimals = [
  "Giraffe",
  "Lion",
  "Tiger",
  "Gorilla",
  "Fox",
  "Kangaroo",
  "Squirrel",
  "Elephant",
  "Crocodile",
] as const;
