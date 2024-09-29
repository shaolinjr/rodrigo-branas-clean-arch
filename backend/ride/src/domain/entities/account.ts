import { CarPlate } from "../vos/car-plate";
import { Cpf } from "../vos/cpf";
import { Email } from "../vos/email";
import { Name } from "../vos/name";
import { Password } from "../vos/password";
import { UUID } from "../vos/uuid";

export class Account {
  private accountId: UUID;
  private name: Name;
  private email: Email;
  private cpf: Cpf;
  private carPlate?: CarPlate;
  private password: Password;

  constructor(
    accountId: string,
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    readonly isPassenger: boolean,
    readonly isDriver: boolean,
    password: string
  ) {
    this.accountId = new UUID(accountId);
    this.name = new Name(name);
    this.email = new Email(email);
    this.cpf = new Cpf(cpf);
    this.password = new Password(password);
    if (isDriver) this.carPlate = new CarPlate(carPlate);
  }

  static create(
    name: string,
    email: string,
    cpf: string,
    carPlate: string,
    isPassenger: boolean,
    isDriver: boolean,
    password: string
  ) {
    const accountId = UUID.create().getValue();
    return new Account(
      accountId,
      name,
      email,
      cpf,
      carPlate,
      !!isPassenger,
      !!isDriver,
      password
    );
  }

  getAccountId() {
    return this.accountId.getValue();
  }

  getName() {
    return this.name.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getCpf() {
    return this.cpf.getValue();
  }

  getCarPlate() {
    return this.carPlate?.getValue();
  }

  getPassword() {
    return this.password.getValue();
  }
}
