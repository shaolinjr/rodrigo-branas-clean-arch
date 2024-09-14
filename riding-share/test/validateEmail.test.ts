import { validateEmail } from "../src/validations/signup.validations";

describe("Validate email format", () => {
  it("should return true for a valid email address", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("john.doe@gmail.com")).toBe(true);
    expect(validateEmail("jane_doe123@yahoo.co.uk")).toBe(true);
  });

  it("should return false for an invalid email address", () => {
    expect(validateEmail("test@example")).toBe(false);
    expect(validateEmail("john.doe@gmail")).toBe(false);
    expect(validateEmail("jane_doe123@yahoo")).toBe(false);
    expect(validateEmail("invalid.email@")).toBe(false);
    expect(validateEmail("invalid.email@domain")).toBe(false);
    expect(validateEmail("invalid.email@domain.")).toBe(false);
    expect(validateEmail("invalid.email@domain..com")).toBe(false);
    expect(validateEmail("invalid.email@domain.c")).toBe(false);
    expect(validateEmail("invalid.email@domain.123")).toBe(false);
    expect(validateEmail("Invalid.Email@domain.123")).toBe(false);
  });
});
