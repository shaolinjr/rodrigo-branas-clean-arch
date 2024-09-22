import { InvalidEmailException } from "../exceptions";

export class Email {
  constructor(private value: string) {
    if (!this.isValid(value)) throw new InvalidEmailException();
    this.value = value;
  }

  private isValid(value: string) {
    return /^(.+)@([a-z0-9]+)([.]{1}[a-z0-9]{2,})*([.]{1}[a-z]{2,})+$/.test(
      value
    );
  }

  getValue() {
    return this.value;
  }
}
