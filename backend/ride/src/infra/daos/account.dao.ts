import { inject } from "../di/di";
import DatabaseConnection from "../database/database-connection";

export interface AccountDAO {
  accountExists(email: string): Promise<boolean>;
  saveAccount(input: any): Promise<{ accountId: string }>;
  getAccountByEmail(email: string): Promise<any>;
  getAccountById(accountId: string): Promise<any>;
}

export class AccountDAODatabase implements AccountDAO {
  @inject("databaseConnection")
  connection: DatabaseConnection;

  constructor() {}

  async accountExists(email: string): Promise<boolean> {
    const [accountFound] = await this.connection?.query(
      "select account_id from ccca.account where email = $1",
      [email]
    );
    return !!accountFound;
  }

  async saveAccount(input: any): Promise<{ accountId: string }> {
    const id = crypto.randomUUID();
    await this.connection?.query(
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
    return { accountId: id };
  }

  async getAccountByEmail(email: string): Promise<any> {
    const [accountFound] = await this.connection?.query(
      "select * from ccca.account where email = $1",
      [email]
    );
    return accountFound;
  }

  async getAccountById(accountId: string): Promise<any> {
    const [accountFound] = await this.connection?.query(
      "select * from ccca.account where account_id = $1",
      [accountId]
    );
    return accountFound;
  }
}

export class AccountDAOInMemory implements AccountDAO {
  private readonly accounts: any[] = [];

  async accountExists(email: string): Promise<boolean> {
    return this.accounts.findIndex((account) => account.email === email) !== -1;
  }
  async saveAccount(input: any): Promise<{ accountId: string }> {
    const id = crypto.randomUUID();
    this.accounts.push({
      account_id: id,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      car_plate: input.carPlate || null,
      is_passenger: !!input.isPassenger,
      is_driver: !!input.isDriver,
      password: input.password,
    });
    return { accountId: id };
  }
  async getAccountByEmail(email: string): Promise<any> {
    return this.accounts.find((account) => account.email === email);
  }
  async getAccountById(accountId: string): Promise<any> {
    return this.accounts.find((account) => account.account_id === accountId);
  }
}
