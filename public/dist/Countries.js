class Countries {
    constructor(value) {
        if (!Countries.isValid(value)) {
            throw new Error("invalid country code");
        }
        this.value = value;
    }
    static get supportedCountries() {
        return [
            "US", "CA", "GB", "IN", "AU", "FR", "DE", "JP", "CN", "BR", "ZA"
        ];
    }
    static isValid(value) {
        return Countries.supportedCountries.includes(value.toUpperCase());
    }
    toString() {
        return this.value;
    }
}
export default Countries;
