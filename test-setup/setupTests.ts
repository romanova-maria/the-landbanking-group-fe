import { afterEach, afterAll, beforeAll, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { mockServer } from "./mockServer.js";
import { toHaveNoViolations } from "jest-axe";

expect.extend(matchers);
expect.extend(toHaveNoViolations); // to check a11y issues

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  cleanup();
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
