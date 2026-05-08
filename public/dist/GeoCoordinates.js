class GeoCoordinates {
    constructor(latitude, longitude) {
        if (!GeoCoordinates.isValid(latitude, longitude)) {
            throw new Error("invalid geographical coordinates");
        }
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
    }
    static isValid(latitude, longitude) {
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);
        return (!isNaN(lat) && !isNaN(lon) &&
            lat >= -90 && lat <= 90 &&
            lon >= -180 && lon <= 180);
    }
    toString() {
        return `${this.latitude}, ${this.longitude}`;
    }
}
export default GeoCoordinates;
