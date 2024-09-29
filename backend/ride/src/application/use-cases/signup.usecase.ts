import { inject } from "../../infra/di/di";
import { AccountRepository } from "../../infra/repositories/account.repository";
import { Account } from "../../domain/entities/account";
import { MailerGateway } from "../../infra/gateways/mailer.gateway";
import { AccountAlreadyExistsException } from "../../exceptions";

type AccountCreatedResponse = {
  accountId: string;
};

export class SignUp {
  @inject("accountRepository")
  private accountRepository: AccountRepository;

  @inject("mailerGateway")
  private mailerGateway: MailerGateway;

  constructor() {}

  async execute(input: any): Promise<AccountCreatedResponse> {
    const account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.carPlate,
      input.isPassenger,
      input.isDriver,
      input.password
    );
    const exists = await this.accountRepository.accountWithEmailExists(
      input.email
    );
    if (exists) throw new AccountAlreadyExistsException();
    const { accountId } = await this.accountRepository.saveAccount(account);
    await this.mailerGateway.send(
      account.getEmail(),
      "Welcome!",
      "Welcome to our ride-share platform!"
    );
    return {
      accountId,
    };
  }
}
