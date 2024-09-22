import { InvalidNameException } from "../exceptions";

export class Name {
  constructor(private value: string) {
    if (!this.isValid(value)) throw new InvalidNameException();
    this.value = value;
  }

  private isValid(name: string) {
    // Only letters and spaces
    if (/[^A-Z\s]/gi.test(name)) return false;
    // At least two words
    if (/(?:[a-zA-Z]+\s+)+(?:[a-zA-Z]+\s*)+/i.test(name)) return true;

    return false;
  }

  getValue() {
    return this.value;
  }
}
