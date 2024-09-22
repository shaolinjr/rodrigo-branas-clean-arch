import { Name } from "../src/domain/name";
import { InvalidNameException } from "../src/exceptions";

describe("Validate name format", () => {
  it.each(["Arthur Pires", "Arthur de Castro Pires"])(
    "should work for a valid name: %s",
    (value: string) => {
      expect(new Name(value)).toBeDefined();
    }
  );

  it.each(["", "Arthur", "Arthur Pires@", "Arthur Pires 123"])(
    "should throw for an invalid name: %s",
    (value: string) => {
      expect(() => new Name(value)).toThrow(InvalidNameException);
    }
  );
});
