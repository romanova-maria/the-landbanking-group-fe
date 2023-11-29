import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RatingActions from "./RatingActions";
import { RatedAnimalContext } from "../context/RatedAnimal";

const defaultProviderValue = {
  ratedAnimal: null,
  rateAnimal: () => {},
  removeRating: () => {},
  rateAnimalCharacteristic: vi.fn(),
  unrateAnimalCharacteristic: vi.fn(),
};

// TODO: more tests should be added

describe("Animal component", function () {
  const renderRatedAnimals = (rating?: boolean) => {
    render(
      <RatedAnimalContext.Provider value={defaultProviderValue}>
        <RatingActions characteristicName="Test name" rating={rating} />,
      </RatedAnimalContext.Provider>,
    );
  };

  it("should show Remove button if the characteristic is liked", () => {
    renderRatedAnimals(true);

    expect(screen.queryByLabelText("Cancel")).toBeInTheDocument();
    expect(screen.queryByLabelText("Cancel")).toBeVisible();
  });

  it("should show Remove button if the characteristic is liked", () => {
    renderRatedAnimals(false);

    expect(screen.queryByLabelText("Cancel")).toBeInTheDocument();
    expect(screen.queryByLabelText("Cancel")).toBeVisible();
  });

  it("should not show Remove button if the characteristic is unrated", async () => {
    renderRatedAnimals();

    expect(screen.queryByLabelText("Cancel")).toBeInTheDocument();

    const cancel = await screen.findByLabelText("Cancel");
    expect(cancel).toHaveClass("invisible");
  });
});
