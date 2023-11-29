import { useState } from "react";
import {
  Rating as SimpleStarRating,
  RatingProps,
} from "react-simple-star-rating";
import styled from "styled-components";
import { Button } from "../components";

interface Props extends RatingProps {
  onChangeRating: (rating: number) => void;
  onClearRating: () => void;
}
function Rating({
  onChangeRating,
  onClearRating,
  initialValue = 0,
  ...props
}: Props) {
  const [rating, setRating] = useState(initialValue);
  const handleRating = (rate: number) => {
    onChangeRating(rate);
    setRating(rate);
  };

  const handleClearRating = () => {
    onClearRating();
    setRating(0);
  };

  return (
    <div className="flex flex-col items-center">
      <SimpleStarRating
        onClick={handleRating}
        initialValue={initialValue}
        size={30}
        {...props}
      />
      <div className="text-gray-500 flex flex-col">
        {rating > 0 ? (
          <>
            {`You rated: ${rating}`}
            <Button className="bg-amber-100" onClick={handleClearRating}>
              Clear
            </Button>
          </>
        ) : (
          `Not rated`
        )}
      </div>
    </div>
  );
}

const StyledRating = styled(Rating)`
  svg {
    display: inline;
  }
`;

export default StyledRating;
