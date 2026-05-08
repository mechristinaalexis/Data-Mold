class Countries {
  value: string;

  constructor(value: string) {
    if (!Countries.isValid(value)) {
      throw new Error("invalid country code");
    }
    this.value = value;
  }

  static get supportedCountries(): string[] {
    return [
      "US", "CA", "GB", "IN", "AU", "FR", "DE", "JP", "CN", "BR", "ZA"
    ]; 
  }

  static isValid(value: string): boolean {
    return Countries.supportedCountries.includes(value.toUpperCase());
  }

  toString(): string {
    return this.value;
  }
}

export default Countries;