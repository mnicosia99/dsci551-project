
export class Coordinates {

  lat!: number
  lon!: number

  public Shelter(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }

  // Longitude
  public setLat(lat: number) {
    this.lat = lat;
  }

  public getLat(): number {
    return this.lat;
  }

  public setLon(lon: number) {
    this.lon = lon;
  }

  public getLon(): number {
    return this.lon;
  }
}
