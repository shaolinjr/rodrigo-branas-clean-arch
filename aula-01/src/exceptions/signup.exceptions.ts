import { BaseException } from "./base.exception";

export enum SignupExceptionCode {
  INVALID_CPF = -1,
  INVALID_EMAIL = -2,
  INVALID_NAME = -3,
  ACCOUNT_ALREADY_EXISTS = -4,
  INVALID_CAR_PLATE = -5,
}

export class InvalidCpfException extends BaseException {
  constructor() {
    super("Invalid CPF", SignupExceptionCode.INVALID_CPF);
  }
}

export class InvalidEmailException extends BaseException {
  constructor() {
    super("Invalid email", SignupExceptionCode.INVALID_EMAIL);
  }
}

export class InvalidNameException extends BaseException {
  constructor() {
    super("Invalid name", SignupExceptionCode.INVALID_NAME);
  }
}

export class AccountAlreadyExistsException extends BaseException {
  constructor() {
    super("Account already exists", SignupExceptionCode.ACCOUNT_ALREADY_EXISTS);
  }
}

export class InvalidCarPlateException extends BaseException {
  constructor() {
    super("Invalid car plate", SignupExceptionCode.INVALID_CAR_PLATE);
  }
}
