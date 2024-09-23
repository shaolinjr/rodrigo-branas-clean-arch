import { Ride } from "../../domain/ride";
import { inject } from "../../infra/di/di";
import { AccountRepository } from "../../infra/repositories/account.repository";
import { RideRepository } from "../../infra/repositories/ride.repository";

export interface RequestRideInput {
  passengerId: string;
  from: {
    lat: number;
    long: number;
  };
  to: {
    lat: number;
    long: number;
  };
}

export class RequestRide {
  @inject("rideRepository")
  private rideRepository: RideRepository;
  @inject("accountRepository")
  private accountRepository: AccountRepository;

  async execute(input: RequestRideInput) {
    const ride = Ride.create(
      input.passengerId,
      input.from.lat,
      input.from.long,
      input.to.lat,
      input.to.long
    );

    const passenger = await this.accountRepository.getAccountById(
      input.passengerId
    );
    if (!passenger || !passenger.isPassenger)
      throw new Error("Passenger not found or not a passenger.");
    const canRequestRide = await this.rideRepository.canRequestRide(
      input.passengerId
    );
    if (!canRequestRide) throw new Error("Passenger already has a ride");

    const { rideId } = await this.rideRepository.saveRide(ride);
    return { rideId };
  }
}
