import { Coord } from "./coord";
import { Distance } from "./distance";
import { UUID } from "./uuid";

export class Ride {
  private rideId: UUID;
  private passengerId: UUID;
  // private driverId?: UUID;
  private status: string;
  private fare: number;
  private distance: Distance;
  private coordFrom: Coord;
  private coordTo: Coord;
  private date: Date;

  constructor(
    rideId: string,
    passengerId: string,
    status: string,
    fare: number,
    distance: number,
    fromLat: number,
    fromLon: number,
    toLat: number,
    toLon: number,
    date: Date
    // driverId?: string
  ) {
    this.rideId = new UUID(rideId);
    this.passengerId = new UUID(passengerId);
    // this.driverId = driverId ? new UUID(driverId) : undefined;
    this.status = status;
    this.fare = fare;
    this.distance = new Distance(distance);
    this.coordFrom = new Coord(fromLat, fromLon);
    this.coordTo = new Coord(toLat, toLon);
    this.date = date;
  }

  static create(
    passengerId: string,
    fromLat: number,
    fromLong: number,
    toLat: number,
    toLong: number
  ): Ride {
    const rideId = UUID.create();
    const status = "requested";
    const fare = 0;
    const distance = Distance.create(
      new Coord(fromLat, fromLong),
      new Coord(toLat, toLong)
    );
    const date = new Date();
    return new Ride(
      rideId.getValue(),
      passengerId,
      status,
      fare,
      distance.getValue(),
      fromLat,
      fromLong,
      toLat,
      toLong,
      date
    );
  }

  getRideId(): string {
    return this.rideId.getValue();
  }

  getPassengerId(): string {
    return this.passengerId.getValue();
  }

  // getDriverId(): UUID | undefined {
  //   return this?.driverId;
  // }

  getStatus(): string {
    return this.status;
  }

  getFare(): number {
    return this.fare;
  }

  getDistance(): number {
    return this.distance.getValue();
  }

  getLatFrom(): number {
    return this.coordFrom.getLat();
  }

  getLongFrom(): number {
    return this.coordFrom.getLong();
  }

  getLatTo(): number {
    return this.coordTo.getLat();
  }

  getLongTo(): number {
    return this.coordTo.getLong();
  }

  getCoordTo(): Coord {
    return this.coordTo;
  }
  getCoordFrom(): Coord {
    return this.coordFrom;
  }

  getDate(): Date {
    return this.date;
  }
}
