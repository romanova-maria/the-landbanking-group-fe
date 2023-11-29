import { wildAnimals } from "./data/animals";
import { Animal } from "./Animal";
import { RatedAnimalProvider } from "./Animal/context/RatedAnimal";

function App() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl m-3 font-bold">Animals</h1>
      {wildAnimals.map((animalName) => (
        <RatedAnimalProvider key={animalName} name={animalName}>
          <Animal name={animalName} />
        </RatedAnimalProvider>
      ))}
    </div>
  );
}

export default App;
