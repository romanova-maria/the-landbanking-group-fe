import useAnimal from "./context/useAnimal";
import { AnimalName } from "../data/animals";
import { Rating } from "../Rating";
import { useRatedAnimal } from "./context/useRatedAnimal";
import { Characteristic } from "./Characteristic";

interface AnimalProps {
  name: AnimalName;
}

const Animal = ({ name }: AnimalProps) => {
  const [animal, isLoading] = useAnimal(name);
  const { ratedAnimal, rateAnimal, removeRating } = useRatedAnimal();

  if (isLoading) return <div>Loading...</div>;

  if (!animal?.characteristics) return <div>No characteristics</div>;

  return (
    <div className="w-full odd:bg-blue-100 even:bg-blue-50 shadow-blue-300 mb-2 p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 mr-5 flex flex-col items-center">
        <div className="text-blue-500 text-3xl" role="heading">
          {name}
        </div>
        <Rating
          onChangeRating={(rating: number) => rateAnimal(rating)}
          initialValue={ratedAnimal?.rating}
          onClearRating={removeRating}
        />
      </div>
      <div className="w-full md:w-3/4 flex-row">
        {Object.keys(animal?.characteristics).map((cName) => (
          <Characteristic
            key={cName}
            name={cName}
            value={animal?.characteristics[cName]}
          />
        ))}
      </div>
    </div>
  );
};

export default Animal;
