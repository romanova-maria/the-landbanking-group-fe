import { Button } from "../../components";
// @ts-expect-error: Cannot find module './../assets/icons/thumbs-down-solid.svg?react'
import ThumbsUp from "../../assets/icons/thumbs-up-solid.svg?react";
// @ts-expect-error: Cannot find module './../assets/icons/thumbs-down-solid.svg?react'
import ThumbsDown from "../../assets/icons/thumbs-down-solid.svg?react";
// @ts-expect-error: Cannot find module './../assets/icons/thumbs-down-solid.svg?react'
import XMark from "../../assets/icons/xmark-solid.svg?react";
import { useRatedAnimal } from "../context/useRatedAnimal";

const RatingActions = ({
  characteristicName,
  rating = null,
}: {
  characteristicName: string;
  rating?: boolean | null;
}) => {
  const { rateAnimalCharacteristic, unrateAnimalCharacteristic } =
    useRatedAnimal();
  return (
    <>
      <Button
        className="border-none"
        onClick={() => rateAnimalCharacteristic(characteristicName, true)}
        aria-label="Like"
      >
        <ThumbsUp
          className={`h-6 fill-gray-400 ${rating ? "fill-yellow-400" : ""}`}
          data-testid="like-characteristic-icon"
        />
      </Button>
      <Button
        className="border-none"
        onClick={() => rateAnimalCharacteristic(characteristicName, false)}
        aria-label="Dislike"
      >
        <ThumbsDown
          className={`h-6 fill-gray-400 ${
            rating === false ? "fill-red-700" : ""
          }`}
          data-testid="dislike-characteristic-icon"
        />
      </Button>
      <Button
        className={`bg-gray-300 ${rating === null ? "invisible" : ""}`}
        onClick={() => unrateAnimalCharacteristic(characteristicName)}
        aria-label="Cancel"
        aria-hidden={rating === null}
      >
        <XMark className="h-4 fill-gray-900" />
      </Button>
    </>
  );
};

export default RatingActions;
