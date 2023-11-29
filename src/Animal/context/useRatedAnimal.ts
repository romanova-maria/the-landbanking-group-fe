import { useContext, useEffect, useState } from "react";
import { AnimalName } from "../../data/animals";
import { getStoredItem, isObjectEmpty, storeItem } from "../../utils";
import { RatedAnimalContext } from "./RatedAnimal";

const RATED_ANIMALS_KEY = "ratedAnimals";

export type CharacteristicRating = Record<string, boolean>;

export type RatedAnimal =
  | { rating: number; characteristics: never }
  | { rating: never; characteristics: CharacteristicRating }
  | { rating: number; characteristics: CharacteristicRating };

type RatedAnimals = Record<AnimalName, RatedAnimal>;

export const useRatedAnimal = () => {
  const value = useContext(RatedAnimalContext);
  if (value === null) {
    throw new Error("useRatedAnimal must be used within it's context provider");
  }

  return value;
};
export const useRatedAnimalInitial = (name: AnimalName) => {
  const [ratedAnimal, setRatedAnimal] = useState<RatedAnimal | null>(() => {
    const ratedAnimals =
      getStoredItem<Record<AnimalName, RatedAnimal>>(RATED_ANIMALS_KEY);
    if (ratedAnimals == null) return null;

    return ratedAnimals[name];
  });

  useEffect(
    function saveRatedAnimalsLocally() {
      const localRatedAnimals: RatedAnimals =
        getStoredItem<RatedAnimals>(RATED_ANIMALS_KEY) || ({} as RatedAnimals);
      if (!ratedAnimal) {
        localRatedAnimals[name] && delete localRatedAnimals[name];
      } else {
        localRatedAnimals[name] = ratedAnimal;
      }
      storeItem(RATED_ANIMALS_KEY, localRatedAnimals);
    },
    [name, ratedAnimal],
  );

  function rateAnimal(rating: number) {
    const updatedRatedAnimal = ratedAnimal
      ? { ...ratedAnimal, rating }
      : ({ rating } as RatedAnimal);

    setRatedAnimal({ ...updatedRatedAnimal });
  }

  function rateAnimalCharacteristic(characteristicName: string, like: boolean) {
    const updatedCharacteristics: CharacteristicRating =
      ratedAnimal?.characteristics
        ? { ...ratedAnimal.characteristics, [characteristicName]: like }
        : { [characteristicName]: like };

    const updatedRatedAnimal = ratedAnimal
      ? {
          ...ratedAnimal,
          characteristics: updatedCharacteristics,
        }
      : ({ characteristics: updatedCharacteristics } as RatedAnimal);

    setRatedAnimal({ ...updatedRatedAnimal });
  }

  function removeRating() {
    if (!ratedAnimal) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rating, ...restAnimalInfo } = ratedAnimal;

    if (isObjectEmpty(restAnimalInfo)) {
      setRatedAnimal(null);
    } else {
      setRatedAnimal({
        ...(restAnimalInfo as RatedAnimal),
      });
    }
  }

  function unrateAnimalCharacteristic(characteristicName: string) {
    if (!ratedAnimal?.characteristics) return;

    const updatedCharacteristics: CharacteristicRating = {
      ...ratedAnimal.characteristics,
    };
    delete updatedCharacteristics[characteristicName];

    if (isObjectEmpty(updatedCharacteristics)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { characteristics, ...restRatedAnimal } = ratedAnimal;

      if (isObjectEmpty(restRatedAnimal)) {
        setRatedAnimal(null);
      } else {
        setRatedAnimal({ ...(restRatedAnimal as RatedAnimal) });
      }
    } else {
      setRatedAnimal({
        ...ratedAnimal,
        characteristics: updatedCharacteristics,
      });
    }
  }

  return {
    ratedAnimal,
    rateAnimal,
    removeRating,
    rateAnimalCharacteristic,
    unrateAnimalCharacteristic,
  };
};
