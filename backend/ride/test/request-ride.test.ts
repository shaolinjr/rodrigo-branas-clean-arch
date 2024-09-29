import { GetRide } from "../src/application/use-cases/get-ride.usecase";
import { RequestRide } from "../src/application/use-cases/request-ride.usecase";
import { SignUp } from "../src/application/use-cases/signup.usecase";
import { Ride } from "../src/domain/entities/ride";
import { PgPromiseAdapter } from "../src/infra/database/database-connection";
import { Registry } from "../src/infra/di/di";
import { MailerGatewayInMemory } from "../src/infra/gateways/mailer.gateway";
import { AccountRepositoryDatabase } from "../src/infra/repositories/account.repository";
import { RideRepositoryDatabase } from "../src/infra/repositories/ride.repository";

describe("Validate Request Ride use case", () => {
  let requestRideUC: RequestRide;
  let signupUC: SignUp;
  let getRideUC: GetRide;

  beforeEach(() => {
    Registry.getInstance().provide(
      "databaseConnection",
      new PgPromiseAdapter()
    );
    Registry.getInstance().provide(
      "rideRepository",
      new RideRepositoryDatabase()
    );
    Registry.getInstance().provide(
      "accountRepository",
      new AccountRepositoryDatabase()
    );
    Registry.getInstance().provide(
      "mailerGateway",
      new MailerGatewayInMemory()
    );
    requestRideUC = new RequestRide();
    signupUC = new SignUp();
    getRideUC = new GetRide();
  });

  afterEach(async () => {
    const connection = Registry.getInstance().inject("databaseConnection");
    await connection.close();
  });

  it("should request a ride successfully for a passenger", async () => {
    const inputSignup = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      isPassenger: true,
    };

    const outputSignup = await signupUC.execute(inputSignup);

    const inputRequestRide = {
      passengerId: outputSignup.accountId,
      from: {
        lat: -27.584905257808835,
        long: -48.545022195325124,
      },
      to: {
        lat: -27.496887588317275,
        long: -48.522234807851476,
      },
    };

    const outputRequestRide = await requestRideUC.execute(inputRequestRide);
    expect(outputRequestRide.rideId).toBeDefined();

    const outputGetRide = await getRideUC.execute(outputRequestRide.rideId);
    expect(outputGetRide.rideId).toBe(outputRequestRide.rideId);

    // console.log(outputGetRide);

    expect(outputGetRide.passengerId).toBe(inputRequestRide.passengerId);
    expect(outputGetRide.from.lat).toBe(inputRequestRide.from.lat);
    expect(outputGetRide.from.long).toBe(inputRequestRide.from.long);
    expect(outputGetRide.to.lat).toBe(inputRequestRide.to.lat);
    expect(outputGetRide.to.long).toBe(inputRequestRide.to.long);
    expect(outputGetRide.status).toBe("requested");
  });

  it("should not request a ride if the account is not from a passenger", async function () {
    const inputSignup = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      carPlate: "AAA9999",
      isDriver: true,
    };
    const outputSignup = await signupUC.execute(inputSignup);
    const inputRequestRide = {
      passengerId: outputSignup.accountId,
      from: { lat: -27.584905257808835, long: -48.545022195325124 },
      to: { lat: -27.496887588317275, long: -48.522234807851476 },
    };
    await expect(() => requestRideUC.execute(inputRequestRide)).rejects.toThrow(
      new Error("Passenger not found or not a passenger.")
    );
  });
});
