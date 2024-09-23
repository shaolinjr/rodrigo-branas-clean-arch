import { GetAccount } from "../../application/use-cases/get-account.usecase";
import { SignUp } from "../../application/use-cases/signup.usecase";
import { inject } from "../di/di";
import HttpServer from "../http/httpServer";

export default class AccountController {
  @inject("httpServer")
  httpServer?: HttpServer;
  @inject("signup")
  signup?: SignUp;
  @inject("getAccount")
  getAccount?: GetAccount;

  constructor() {
    this.httpServer?.register(
      "post",
      "/signup",
      async (params: any, body: any) => {
        const input = body;
        const output = await this.signup?.execute(input);
        return output;
      }
    );

    this.httpServer?.register(
      "get",
      "/accounts/:accountId",
      async (params: any, body: any) => {
        const output = await this.getAccount?.execute(params.accountId);
        return output;
      }
    );
  }
}
