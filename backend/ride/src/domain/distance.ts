import { Coord } from "./coord";

export class Distance {
  constructor(private readonly value: number) {}

  static create(coordA: Coord, coordB: Coord) {
    const distance = Distance.calculate(coordA, coordB);
    return new Distance(distance);
  }

  getValue() {
    return this.value;
  }

  /**
   * Calculates the distance (in kms) between point A and B using earth's radius as the spherical surface
   * @param pointA Coordinates from Point A
   * @param pointB Coordinates from Point B
   * Based on https://www.movable-type.co.uk/scripts/latlong.html
   */

  private static calculate(coordA: Coord, coordB: Coord) {
    const radius = 6371; // km

    //convert latitude and longitude to radians
    const deltaLatitude = ((coordB.getLat() - coordA.getLat()) * Math.PI) / 180;
    const deltaLongitude =
      ((coordB.getLong() - coordA.getLong()) * Math.PI) / 180;

    const halfChordLength =
      Math.cos((coordA.getLat() * Math.PI) / 180) *
        Math.cos((coordB.getLat() * Math.PI) / 180) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2) +
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2);

    const angularDistance =
      2 *
      Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength));

    return radius * angularDistance;
  }
}
