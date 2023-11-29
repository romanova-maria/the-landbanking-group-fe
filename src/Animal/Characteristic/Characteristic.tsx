import RatingActions from "./RatingActions";
import { useRatedAnimal } from "../context/useRatedAnimal";

interface CharacteristicProps {
  name: string;
  value: string;
}

const Characteristic = ({ name, value }: CharacteristicProps) => {
  const { ratedAnimal } = useRatedAnimal();
  function getCharacteristicRating(): boolean | null {
    if (
      !ratedAnimal ||
      !ratedAnimal.characteristics ||
      ratedAnimal.characteristics[name] === undefined
    )
      return null;

    return ratedAnimal.characteristics[name];
  }

  return (
    <div className="flex flex-col md:flex-row border-b border-gray-300 items-center">
      <div className="text-center md:text-right pr-2 w-full md:w-1/5">
        {name}:
      </div>
      <div className="w-full md:w-1/5 flex justify-center">
        <RatingActions
          characteristicName={name}
          rating={getCharacteristicRating()}
        />
      </div>
      <div className="w-full md:w-3/5 text-center md:text-left pl-2">{value}</div>
    </div>
  );
};

export default Characteristic;
