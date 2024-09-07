import { BaseException } from "./base.exception";

export enum AccountExceptionCode {
  ACCOUNT_NOT_FOUND = -1,
}

export class AccountNotFoundException extends BaseException {
  constructor() {
    super("Account not found", AccountExceptionCode.ACCOUNT_NOT_FOUND);
  }
}
