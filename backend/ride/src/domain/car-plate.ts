import { InvalidCarPlateException } from "../exceptions";

export class CarPlate {
  constructor(private value: string) {
    if (!this.isValid(value)) throw new InvalidCarPlateException();
    this.value = value;
  }
  private isValid(value: string) {
    return /^[A-Z]{3}[0-9]{4}$/.test(value);
  }

  getValue() {
    return this.value;
  }
}
