import { render, screen } from "@testing-library/react";
import { RatedAnimalProvider } from "./context/RatedAnimal";
import { Animal } from "./index";
import { describe, expect, it } from "vitest";
import { AnimalName } from "../data/animals";
import { mockServer } from "../../test-setup/mockServer";
import { http, HttpResponse } from "msw";
import { BASE_URL } from "../services/api-client";
import { tiger } from "../mocks/animal";

// TODO: more tests should be added

describe("Animal component", function () {
  const renderAnimal = (name?: AnimalName) => {
    const aName = name || "Tiger";
    return render(
      <RatedAnimalProvider name={aName}>
        <Animal name={aName} />
      </RatedAnimalProvider>,
    );
  };

  mockServer.use(
    http.get(`${BASE_URL}/animals`, () => {
      return HttpResponse.json(tiger);
    }),
  );

  it("should display an animal name with rating component", async () => {
    renderAnimal();
    const animal = await screen.findByText("Tiger");
    expect(animal).toBeInTheDocument();
  });
});
