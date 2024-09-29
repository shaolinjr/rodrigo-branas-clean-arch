import { Email } from "../src/domain/vos/email";
import { InvalidEmailException } from "../src/exceptions";

describe("Validate email format", () => {
  it.each([
    "test@example.com",
    "john.doe@gmail.com",
    "jane_doe123@yahoo.co.uk",
  ])("should return true for a valid email address", (value: string) => {
    expect(new Email(value)).toBeDefined();
  });

  it.each([
    "test@example",
    "john.doe@gmail",
    "jane_doe123@yahoo",
    "invalid.email@",
    "invalid.email@domain",
    "invalid.email@domain.",
    "invalid.email@domain..com",
    "invalid.email@domain.c",
    "invalid.email@domain.123",
    "Invalid.Email@domain.123",
  ])("should return false for an invalid email address", (value: string) => {
    expect(() => new Email(value)).toThrow(InvalidEmailException);
  });
});
