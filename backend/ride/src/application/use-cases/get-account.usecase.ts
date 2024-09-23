import { inject } from "../../infra/di/di";
import { AccountRepository } from "../../infra/repositories/account.repository";

export class GetAccount {
  @inject("accountRepository")
  private accountRepository: AccountRepository;

  constructor() {}

  async execute(accountId: string) {
    const account = await this.accountRepository.getAccountById(accountId);
    if (!account) throw new Error("Account not found");

    return {
      accountId: account.getAccountId(),
      name: account.getName(),
      email: account.getEmail(),
      cpf: account.getCpf(),
      carPlate: account.getCarPlate(),
      isPassenger: account.isPassenger,
      isDriver: account.isDriver,
      password: account.getPassword(),
    };
  }
}
