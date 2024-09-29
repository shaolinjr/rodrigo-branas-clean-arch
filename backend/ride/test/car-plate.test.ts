import { CarPlate } from "../src/domain/vos/car-plate";
import { InvalidCarPlateException } from "../src/exceptions";

describe("Validate car plate format", () => {
  it("should create a valid car plate", () => {
    expect(new CarPlate("ABC1234")).toBeDefined();
  });

  test.each(["ABC123", "ABC12345", "ABC12A3"])(
    "should not create an invalid car plate: %s",
    (value: string) => {
      expect(() => new CarPlate(value)).toThrow(InvalidCarPlateException);
    }
  );
});
