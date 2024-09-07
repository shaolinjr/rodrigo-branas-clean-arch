import {
  AccountAlreadyExistsException,
  SignupExceptionCode,
} from "../src/exceptions";
import pgp from "pg-promise";
import { createAccount } from "../src/use-cases/signup.use-case";
import { getAccountById } from "../src/use-cases/get-account.use-case";

describe("Validate signup UC", () => {
  let connection: any;

  const cleanSignup = (accountId: string) =>
    connection.query("delete from ccca.account where account_id = $1", [
      accountId,
    ]);

  beforeAll(() => {
    connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  });

  afterAll(async () => {
    if (connection) {
      await connection.$pool.end();
    }
  });

  it("should create a new driver account", async () => {
    const validAccountInput = {
      name: "Arthur Pires",
      email: "arthurpires123@hotmail.com",
      cpf: "09464525630",
      carPlate: "ABC1234",
      isDriver: true,
      isPassenger: false,
      password: "123456",
    };

    const { accountId } = await createAccount(connection, validAccountInput);
    const account = await getAccountById(connection, accountId);
    await cleanSignup(accountId);

    expect(account.email).toBe(validAccountInput.email);
    expect(accountId).toBeTruthy();
    expect(account.is_driver).toBe(true);
    expect(account.is_passenger).toBe(false);
    expect(account.car_plate).toBe(validAccountInput.carPlate);
  });

  it("should create a new passenger account", async () => {
    const validAccountInput = {
      name: "Arthur Pires",
      email: "arthurpires123@hotmail.com",
      cpf: "09464525630",
      isDriver: false,
      isPassenger: true,
      password: "123456",
    };

    const { accountId } = await createAccount(connection, validAccountInput);
    const account = await getAccountById(connection, accountId);

    await cleanSignup(accountId);

    expect(account.email).toBe(validAccountInput.email);
    expect(accountId).toBeTruthy();
    expect(account.is_driver).toBe(false);
    expect(account.is_passenger).toBe(true);
    expect(account.car_plate).toBeNull();
  });

  it("should fail creating a duplicated account", async () => {
    const validAccountInput = {
      name: "Arthur Pires",
      email: "arthurpires123@hotmail.com",
      cpf: "09464525630",
      isDriver: false,
      isPassenger: true,
      password: "123456",
    };

    const { accountId } = await createAccount(connection, validAccountInput);
    const response = await createAccount(connection, validAccountInput)
      .catch((e) => e)
      .finally(() => cleanSignup(accountId));

    expect(response).toBeInstanceOf(AccountAlreadyExistsException);
  });
});
