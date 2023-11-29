import { createContext, PropsWithChildren } from "react";
import { RatedAnimal, useRatedAnimalInitial } from "./useRatedAnimal";
import { AnimalName } from "../../data/animals";

export const RatedAnimalContext = createContext<RatedAnimalContext | null>(
  null,
);

interface RatedAnimalContext {
  ratedAnimal: RatedAnimal | null;
  rateAnimal: (rating: number) => void;
  removeRating: () => void;
  rateAnimalCharacteristic: (characteristicName: string, like: boolean) => void;
  unrateAnimalCharacteristic: (characteristicName: string) => void;
}

export function RatedAnimalProvider({
  children,
  name,
}: PropsWithChildren & { name: AnimalName }) {
  const {
    ratedAnimal,
    rateAnimal,
    removeRating,
    rateAnimalCharacteristic,
    unrateAnimalCharacteristic,
  } = useRatedAnimalInitial(name);

  return (
    <RatedAnimalContext.Provider
      value={{
        ratedAnimal,
        rateAnimal,
        removeRating,
        rateAnimalCharacteristic,
        unrateAnimalCharacteristic,
      }}
    >
      {children}
    </RatedAnimalContext.Provider>
  );
}
