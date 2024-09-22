import { Account } from "../src/domain/account";
import {
  InvalidCarPlateException,
  InvalidCpfException,
  InvalidEmailException,
  InvalidNameException,
} from "../src/exceptions";

describe("Test Account creation", () => {
  it("should not create an account with invalid name", async () => {
    let input = {
      name: "Arthur",
      email: "arthurpires1@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    expect(() =>
      Account.create(
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        input.isPassenger,
        input.isDriver,
        input.password
      )
    ).toThrow(InvalidNameException);
  });

  it("should not create an account with invalid email", async () => {
    let input = {
      name: "Arthur Pires",
      email: "arthurpireshotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };
    expect(() =>
      Account.create(
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        input.isPassenger,
        input.isDriver,
        input.password
      )
    ).toThrow(InvalidEmailException);
  });

  it("should not create an account with invalid cpf", async () => {
    let input = {
      name: "Arthur Pires",
      email: "arthurpires2@hotmail.com",
      cpf: "0946452563011",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    expect(() =>
      Account.create(
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        input.isPassenger,
        input.isDriver,
        input.password
      )
    ).toThrow(InvalidCpfException);
  });

  it("should not create a driver account with invalid car plate", async () => {
    let input = {
      name: "Arthur Pires",
      email: "arthurpires3@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1A234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    expect(() =>
      Account.create(
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        input.isPassenger,
        input.isDriver,
        input.password
      )
    ).toThrow(InvalidCarPlateException);
  });

  it("should create a driver account", async () => {
    const randomInt = Math.floor(Math.random() * 1000);
    let input = {
      name: "Arthur Pires",
      email: `arthurpires${randomInt}@hotmail.com`,
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    const account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.carPlate,
      input.isPassenger,
      input.isDriver,
      input.password
    );
    expect(account).toBeDefined();
  });
});
