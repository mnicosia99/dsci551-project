import { Coordinates } from "./Coordinates";
// import { Description } from "./Description";

export class Shelter {

  county!: string
  shelter_name!: string
  coordinates!: Coordinates
  address!: string
  phone_number!: string
  volunteer!: string
  donation!: string
  description!: string

  public Shelter(county: string, shelter_name: string) {
    this.county = county;
    this.shelter_name = shelter_name;
  }

  public getId(): string {
    return this.shelter_name.replace(" ", "") + this.county.replace(" ", "")
  }

  public setVolunteer(volunteer: string) {
    this.volunteer = volunteer;
  }

  public getVolunteer(): string {
    return this.volunteer;
  }

  public setDonation(donation: string) {
    this.donation = donation;
  }

  public getDonationn(): string {
    return this.donation;
  }

  public setDescription(description: string) {
    this.description = description

  }

  public getDescription(): string {
    return this.description;
  }

  // public setDescription(description: string) {
  //   this.description = new Description();
  //   this.description.text = description

  // }

  // public getDescription(): Description {
  //   return this.description;
  // }

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
