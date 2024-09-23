import express from "express";
import { AccountNotFoundException } from "./exceptions";
import { BaseException } from "./exceptions/base.exception";
import { AccountDAODatabase } from "./infra/daos/account.dao";
import { MailerGatewayInMemory } from "./infra/gateways/mailer.gateway";
import { ExpressAdapter } from "./infra/http/httpServer";
import { PgPromiseAdapter } from "./infra/database/database-connection";
import { Registry } from "./infra/di/di";
import { AccountRepositoryDatabase } from "./infra/repositories/account.repository";
import { GetAccount } from "./application/use-cases/get-account.usecase";
import { SignUp } from "./application/use-cases/signup.usecase";
import AccountController from "./infra/controllers/account.controller";
import { RideRepositoryDatabase } from "./infra/repositories/ride.repository";
import { RequestRide } from "./application/use-cases/request-ride.usecase";
import { GetRide } from "./application/use-cases/get-ride.usecase";

const httpServer = new ExpressAdapter();
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
Registry.getInstance().provide(
  "accountRepository",
  new AccountRepositoryDatabase()
);
Registry.getInstance().provide("rideRepository", new RideRepositoryDatabase());
Registry.getInstance().provide("mailerGateway", new MailerGatewayInMemory());

Registry.getInstance().provide("signup", new SignUp());
Registry.getInstance().provide("getAccount", new GetAccount());
Registry.getInstance().provide("requestRide", new RequestRide());
Registry.getInstance().provide("getRide", new GetRide());

Registry.getInstance().provide("accountController", new AccountController());
httpServer.listen(3000);
