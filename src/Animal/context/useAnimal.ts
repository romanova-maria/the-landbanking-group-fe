import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { AnimalName } from "../../data/animals";
import { getStoredItem, isExpired, storeItem } from "../../utils";

const ANIMALS_KEY = "animals";

export type Characteristics = { [key: string]: string };
export interface Animal {
  name: AnimalName;
  characteristics: Characteristics;
}

type Animals = Record<AnimalName, Animal>;
type LocalAnimals = {
  animals: Animals;
  timestamp: Date;
};

const EXPIRATION_PERIOD_MINUTES = 5;

const useAnimal = (name: AnimalName) => {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const localAnimals = getStoredItem<LocalAnimals>(ANIMALS_KEY);
    if (
      localAnimals &&
      localAnimals.timestamp &&
      !isExpired(new Date(localAnimals.timestamp), EXPIRATION_PERIOD_MINUTES)
    ) {
      setAnimal({ ...localAnimals.animals[name] });
      setIsLoading(false);
      return;
    }

    const getAnimal = (matchedAnimals: Animal[]): Animal | undefined => {
      return matchedAnimals.find(
        (animal) => animal.name.toLowerCase() === name.toLowerCase(),
      );
    };

    apiClient
      .get("animals", { params: { name } })
      .then((response) => {
        const animal = getAnimal(response.data);
        if (!animal) return;

        const localAnimalsData = getStoredItem<LocalAnimals>(ANIMALS_KEY);
        let animals = {} as Animals;

        if (localAnimalsData) {
          const { animals: localAnimals } = localAnimalsData;
          animals = localAnimals;
        }
        animals[name] = animal;
        storeItem(ANIMALS_KEY, { animals, timestamp: new Date() });

        setAnimal(animal);
      })
      .catch((error) => console.error(error.message))
      .finally(() => setIsLoading(false));
  }, [name]);

  return [animal, isLoading] as const;
};

export default useAnimal;
