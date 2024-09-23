import { inject } from "../../infra/di/di";
import { RideRepository } from "../../infra/repositories/ride.repository";

export class GetRide {
  @inject("rideRepository")
  private rideRepository: RideRepository;

  async execute(rideId: string) {
    const ride = await this.rideRepository.getRideById(rideId);
    if (!ride) throw new Error("Ride not found");

    return {
      rideId: ride.getRideId(),
      passengerId: ride.getPassengerId(),
      status: ride.getStatus(),
      fare: ride.getFare(),
      distance: ride.getDistance(),
      from: {
        lat: ride.getLatFrom(),
        long: ride.getLongFrom(),
      },
      to: {
        lat: ride.getLatTo(),
        long: ride.getLongTo(),
      },
      date: ride.getDate(),
    };
  }
}
