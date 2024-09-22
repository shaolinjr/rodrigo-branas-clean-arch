import pgp from "pg-promise";
import { inject } from "../di/di";
import DatabaseConnection from "../database/database-connection";
import { Account } from "../../domain/account";

export interface AccountRepository {
  accountWithEmailExists(email: string): Promise<boolean>;
  saveAccount(account: Account): Promise<{ accountId: string }>;
  getAccountByEmail(email: string): Promise<Account | null>;
  getAccountById(accountId: string): Promise<Account | null>;
}

export class AccountRepositoryDatabase implements AccountRepository {
  @inject("databaseConnection")
  connection?: DatabaseConnection;

  constructor() {}

  async accountWithEmailExists(email: string): Promise<boolean> {
    const [accountFound] = await this.connection?.query(
      "select account_id from ccca.account where email = $1",
      [email]
    );
    return !!accountFound;
  }

  async saveAccount(account: Account): Promise<{ accountId: string }> {
    const id = crypto.randomUUID();

    await this.connection?.query(
      "insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        id,
        account.getName(),
        account.getEmail(),
        account.getCpf(),
        account.getCarPlate(),
        !!account.isPassenger,
        !!account.isDriver,
        account.getPassword(),
      ]
    );

    return { accountId: id };
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const [accountFound] = await this.connection?.query(
      "select * from ccca.account where email = $1",
      [email]
    );
    if (!accountFound) return null;
    return new Account(
      accountFound.account_id,
      accountFound.name,
      accountFound.email,
      accountFound.cpf,
      accountFound.car_plate,
      accountFound.is_passenger,
      accountFound.is_driver,
      accountFound.password
    );
  }

  async getAccountById(accountId: string): Promise<Account | null> {
    const [accountFound] = await this.connection?.query(
      "select * from ccca.account where account_id = $1",
      [accountId]
    );
    if (!accountFound) return null;

    return new Account(
      accountFound.account_id,
      accountFound.name,
      accountFound.email,
      accountFound.cpf,
      accountFound.car_plate,
      accountFound.is_passenger,
      accountFound.is_driver,
      accountFound.password
    );
  }
}

export class AccountRepositoryInMemory implements AccountRepository {
  private readonly accounts: Account[] = [];

  async accountWithEmailExists(email: string): Promise<boolean> {
    return (
      this.accounts.findIndex(
        (account: Account) => account.getEmail() === email
      ) !== -1
    );
  }
  async saveAccount(account: Account): Promise<{ accountId: string }> {
    this.accounts.push(account);
    return { accountId: account.getAccountId() };
  }
  async getAccountByEmail(email: string): Promise<any> {
    return this.accounts.find((account) => account.getEmail() === email);
  }
  async getAccountById(accountId: string): Promise<any> {
    return this.accounts.find(
      (account) => account.getAccountId() === accountId
    );
  }
}
