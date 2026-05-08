class GeoCoordinates {
  latitude: number;
  longitude: number;

  constructor(latitude: string, longitude: string) {
    if (!GeoCoordinates.isValid(latitude, longitude)) {
      throw new Error("invalid geographical coordinates");
    }
    this.latitude = parseFloat(latitude);
    this.longitude = parseFloat(longitude);
  }

  static isValid(latitude: string, longitude: string): boolean {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    return (
      !isNaN(lat) && !isNaN(lon) &&
      lat >= -90 && lat <= 90 &&
      lon >= -180 && lon <= 180
    );
  }

  toString(): string {
    return `${this.latitude}, ${this.longitude}`;
  }
}

export default GeoCoordinates;
