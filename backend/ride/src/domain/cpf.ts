import { InvalidCpfException } from "../exceptions";

export class Cpf {
  private readonly CPF_VALID_LENGTH = 11;
  private readonly FIRST_DIGIT_FACTOR = 10;
  private readonly SECOND_DIGIT_FACTOR = 11;

  constructor(private value: string) {
    if (!this.isValid(value)) throw new InvalidCpfException();
    this.value = value;
  }

  private isValid(value: string) {
    value = value.replace(/\D/g, "");
    if (value.length !== this.CPF_VALID_LENGTH) return false;
    if (this.allDigitsTheSame(value)) return false;
    const digit1 = this.calculateDigit(value, this.FIRST_DIGIT_FACTOR);
    const digit2 = this.calculateDigit(value, this.SECOND_DIGIT_FACTOR);
    return `${digit1}${digit2}` === this.extractDigit(value);
  }

  private allDigitsTheSame(value: string) {
    const [firstDigit] = value;
    return [...value].every((digit) => digit === firstDigit);
  }

  private calculateDigit(value: string, factor: number) {
    let total = 0;
    for (const digit of value) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private extractDigit(value: string) {
    return value.slice(9);
  }

  getValue() {
    return this.value;
  }
}
