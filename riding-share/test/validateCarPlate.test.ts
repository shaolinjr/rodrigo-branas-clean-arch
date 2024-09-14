import { validateCarPlate } from "../src/validations/signup.validations";

describe("Validate car plate format", () => {
  it("should return true for a valid plate", () => {
    expect(validateCarPlate("ABC1234")).toBe(true);
  });

  it("should return false for an invalid plate", () => {
    expect(validateCarPlate("ABC123")).toBe(false);
    expect(validateCarPlate("ABC12345")).toBe(false);
    expect(validateCarPlate("ABC12A3")).toBe(false);
  });
});
