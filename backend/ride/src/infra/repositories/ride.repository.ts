import { Ride } from "../../domain/ride";
import DatabaseConnection from "../database/database-connection";
import { inject } from "../di/di";

export interface RideRepository {
  saveRide(ride: any): Promise<{ rideId: string }>;
  getRideById(rideId: string): Promise<Ride | null>;
  canRequestRide(passengerId: string): Promise<boolean>;
}

export class RideRepositoryDatabase implements RideRepository {
  @inject("databaseConnection")
  connection?: DatabaseConnection;

  constructor() {}

  async saveRide(ride: Ride): Promise<{ rideId: string }> {
    const id = crypto.randomUUID();

    await this.connection?.query(
      "insert into ccca.ride (ride_id, passenger_id, status, fare, distance, from_lat, from_long, to_lat,to_long, date) values ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10)",
      [
        id,
        ride.getPassengerId(),
        ride.getStatus(),
        ride.getFare(),
        ride.getDistance(),
        ride.getLatFrom(),
        ride.getLongFrom(),
        ride.getLatTo(),
        ride.getLongTo(),
        ride.getDate(),
      ]
    );

    return { rideId: id };
  }

  async getRideById(rideId: string): Promise<Ride | null> {
    const [rideFound] = await this.connection?.query(
      "select * from ccca.ride where ride_id = $1",
      [rideId]
    );
    if (!rideFound) return null;
    return new Ride(
      rideFound.ride_id,
      rideFound.passenger_id,
      rideFound.status,
      +rideFound.fare,
      +rideFound.distance,
      +rideFound.from_lat,
      +rideFound.from_long,
      +rideFound.to_lat,
      +rideFound.to_long,
      rideFound.date
    );
  }

  async canRequestRide(passengerId: string): Promise<boolean> {
    const [rideFound] = await this.connection?.query(
      "select * from ccca.ride where passenger_id = $1 and status != 'completed'",
      [passengerId]
    );
    return !rideFound;
  }
}
