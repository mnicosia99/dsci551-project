import { Coordinates } from "./Coordinates";

export class Shelter {

  county!: string
  shelter_name!: string
  coordinates!: Coordinates
  address!: string
  phone_number!: string

  public Shelter(county: string, shelter_name: string) {
    this.county = county;
    this.shelter_name = shelter_name;
  }

  public getId(): string {
    return this.shelter_name.replace(" ", "") + this.county.replace(" ", "")
  }

  public setCounty(county: string) {
    this.county = county;
  }

  public getCounty(): string {
    return this.county;
  }

  public setShelterName(shelter_name: string) {
    this.shelter_name = shelter_name;
  }

  public getShelterName(): string {
    return this.shelter_name;
  }

  public setCoordinates(coordinates: Coordinates) {
    this.coordinates = coordinates;
  }

  public getCoordinates(): Coordinates {
    return this.coordinates;
  }

}
