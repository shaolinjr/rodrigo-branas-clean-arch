import sinon from "sinon";
import {
  AccountAlreadyExistsException,
  InvalidCarPlateException,
  InvalidCpfException,
  InvalidEmailException,
  InvalidNameException,
} from "../src/exceptions";

import { MailerGatewayInMemory } from "../src/infra/gateways/mailer.gateway";
import { SignUp } from "../src/application/use-cases/signup.usecase";
import { Registry } from "../src/infra/di/di";
import { PgPromiseAdapter } from "../src/infra/database/database-connection";
import { AccountRepositoryInMemory } from "../src/infra/repositories/account.repository";
import { GetAccount } from "../src/application/use-cases/get-account.usecase";

describe("Validate SignUp use case", () => {
  let signupUC: SignUp;
  let getAccountUC: GetAccount;

  beforeEach(() => {
    Registry.getInstance().provide(
      "databaseConnection",
      new PgPromiseAdapter()
    );
    Registry.getInstance().provide(
      "mailerGateway",
      new MailerGatewayInMemory()
    );
    Registry.getInstance().provide(
      "accountRepository",
      new AccountRepositoryInMemory()
    );

    signupUC = new SignUp();
    getAccountUC = new GetAccount();
  });

  afterEach(async () => {
    const connection = Registry.getInstance().inject("databaseConnection");
    await connection.close();
  });

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

    await expect(() => signupUC.execute(input)).rejects.toThrow(
      InvalidNameException
    );
  });

  it("should not create an account with invalid email", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpireshotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };
    await expect(() => signupUC.execute(validUserInput)).rejects.toThrow(
      InvalidEmailException
    );
  });

  it("should not create an account with invalid cpf", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpires2@hotmail.com",
      cpf: "0946452563011",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    await expect(() => signupUC.execute(validUserInput)).rejects.toThrow(
      InvalidCpfException
    );
  });

  it("should not create a driver account with invalid car plate", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpires3@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1A234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    await expect(() => signupUC.execute(validUserInput)).rejects.toThrow(
      InvalidCarPlateException
    );
  });

  it("should not create a duplicate account", async () => {
    let validUserInput = {
      name: "Arthur Pires",
      email: "arthurpires@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    await signupUC.execute(validUserInput);

    await expect(() => signupUC.execute(validUserInput)).rejects.toThrow(
      AccountAlreadyExistsException
    );
  });

  it("should create a driver account", async () => {
    const randomInt = Math.floor(Math.random() * 1000);
    let validUserInput = {
      name: "Arthur Pires",
      email: `arthurpires${randomInt}@hotmail.com`,
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      password: "123456",
    };

    const response = await signupUC.execute(validUserInput);
    expect(response.accountId).toBeDefined();

    const account = await getAccountUC.execute(response.accountId);
    expect(account).toBeDefined();
    expect(account.isDriver).toBe(true);
    expect(account.isPassenger).toBe(false);
    expect(account.carPlate).toBe(validUserInput.carPlate);
    expect(account.name).toBe(validUserInput.name);
    expect(account.email).toBe(validUserInput.email);
    expect(account.cpf).toBe(validUserInput.cpf);
    expect(account.password).toBe(validUserInput.password);
  });

  it("should create a passenger account", async () => {
    const randomInt = Math.floor(Math.random() * 1000);
    let validUserInput = {
      name: "Arthur Pires",
      email: `arthurpires${randomInt}@hotmail.com`,
      cpf: "09464525630",
      isDriver: false,
      isPassenger: true,
      password: "123456",
    };

    const response = await signupUC.execute(validUserInput);
    expect(response.accountId).toBeDefined();

    const account = await getAccountUC.execute(response.accountId);
    expect(account).toBeDefined();
    expect(account.isDriver).toBe(false);
    expect(account.isPassenger).toBe(true);
    expect(account.carPlate).toBeUndefined();
    expect(account.name).toBe(validUserInput.name);
    expect(account.email).toBe(validUserInput.email);
    expect(account.cpf).toBe(validUserInput.cpf);
    expect(account.password).toBe(validUserInput.password);
  });

  it("should create a passenger account with mailer stub", async () => {
    const mailerStub = sinon
      .stub(MailerGatewayInMemory.prototype, "send")
      .resolves();
    const randomInt = Math.floor(Math.random() * 1000);
    let validUserInput = {
      name: "Arthur Pires",
      email: `arthurpires${randomInt}@hotmail.com`,
      cpf: "09464525630",
      isDriver: false,
      isPassenger: true,
      password: "123456",
    };

    const response = await signupUC.execute(validUserInput);
    expect(response.accountId).toBeDefined();

    const account = await getAccountUC.execute(response.accountId);
    expect(account).toBeDefined();
    expect(account.isDriver).toBe(false);
    expect(account.isPassenger).toBe(true);
    expect(account.carPlate).toBeUndefined();
    expect(account.name).toBe(validUserInput.name);
    expect(account.email).toBe(validUserInput.email);
    expect(account.cpf).toBe(validUserInput.cpf);
    expect(account.password).toBe(validUserInput.password);
    mailerStub.restore();
  });

  it("should create a passenger account with mailer mock", async () => {
    const mailerMock = sinon.mock(MailerGatewayInMemory.prototype);
    const randomInt = Math.floor(Math.random() * 1000);
    let validUserInput = {
      name: "Arthur Pires",
      email: `arthurpires${randomInt}@hotmail.com`,
      cpf: "09464525630",
      isDriver: false,
      isPassenger: true,
      password: "123456",
    };

    mailerMock
      .expects("send")
      .withArgs(
        validUserInput.email,
        "Welcome!",
        "Welcome to our ride-share platform!"
      )
      .once()
      .callsFake(() => {
        console.log("Mocked mailer send method");
      });

    const response = await signupUC.execute(validUserInput);
    expect(response.accountId).toBeDefined();

    const account = await getAccountUC.execute(response.accountId);
    expect(account).toBeDefined();
    expect(account.isDriver).toBe(false);
    expect(account.isPassenger).toBe(true);
    expect(account.carPlate).toBeUndefined();
    expect(account.name).toBe(validUserInput.name);
    expect(account.email).toBe(validUserInput.email);
    expect(account.cpf).toBe(validUserInput.cpf);
    expect(account.password).toBe(validUserInput.password);
    mailerMock.verify();
    mailerMock.restore();
  });
});
