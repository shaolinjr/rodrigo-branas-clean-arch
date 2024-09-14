import { validateName } from "../src/validations/signup.validations";

describe("Validate name format", () => {
  it("should return false if name is empty", () => {
    const name = "";
    const isValid = validateName(name);
    expect(isValid).toBe(false);
  });

  it("should return false if name has only one word", () => {
    const name = "Arthur";
    const isValid = validateName(name);
    expect(isValid).toBe(false);
  });

  it("should return true if name has two words", () => {
    const name = "Arthur Pires";
    const isValid = validateName(name);
    expect(isValid).toBe(true);
  });

  it("should return true if name has more than two words", () => {
    const name = "Arthur de Castro Pires";
    const isValid = validateName(name);
    expect(isValid).toBe(true);
  });

  it("should return false if name has special characters", () => {
    const name = "Arthur Pires@";
    const isValid = validateName(name);
    expect(isValid).toBe(false);
  });

  it("should return false if name has numbers", () => {
    const name = "Arthur Pires 123";
    const isValid = validateName(name);
    expect(isValid).toBe(false);
  });
});
