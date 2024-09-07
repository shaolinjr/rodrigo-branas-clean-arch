import {
  InvalidCarPlateException,
  AccountAlreadyExistsException,
  InvalidNameException,
  InvalidEmailException,
  InvalidCpfException,
} from "../exceptions";
import {
  validateCarPlate,
  validateEmail,
  validateName,
} from "../validations/signup.validations";
import { validateCpf } from "../validations/validateCpf";

type AccountCreatedResponse = {
  accountId: string;
};

const createDriverAccount = async (
  connection: any,
  input: any
): Promise<AccountCreatedResponse> => {
  if (!validateCarPlate(input.carPlate)) throw new InvalidCarPlateException();
  const id = crypto.randomUUID();
  await connection.query(
    "insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      id,
      input.name,
      input.email,
      input.cpf,
      input.carPlate,
      !!input.isPassenger,
      !!input.isDriver,
      input.password,
    ]
  );
  return {
    accountId: id,
  };
};

const createPassengerAccount = async (
  connection: any,
  input: any
): Promise<AccountCreatedResponse> => {
  const id = crypto.randomUUID();
  await connection.query(
    "insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      id,
      input.name,
      input.email,
      input.cpf,
      input.carPlate,
      !!input.isPassenger,
      !!input.isDriver,
      input.password,
    ]
  );
  return {
    accountId: id,
  };
};

const accountExists = async (connection: any, email: string) => {
  const [accountFound] = await connection.query(
    "select * from ccca.account where email = $1",
    [email]
  );
  return !!accountFound;
};

export const createAccount = async (connection: any, input: any) => {
  const exists = await accountExists(connection, input.email);
  if (exists) throw new AccountAlreadyExistsException();
  if (!validateName(input.name)) throw new InvalidNameException();
  if (!validateEmail(input.email)) throw new InvalidEmailException();
  if (!validateCpf(input.cpf)) throw new InvalidCpfException();
  let response;
  if (input.isDriver) {
    response = await createDriverAccount(connection, input);
  } else {
    response = await createPassengerAccount(connection, input);
  }
  return response;
};
