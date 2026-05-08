class States {
  value: string;
  country: string;

  constructor(value: string, country: string) {
    if (!States.isValid(value, country)) {
      throw new Error("invalid state or country");
    }
    this.value = value;
    this.country = country;
  }

  static get supportedStates(): Record<string, string[]> {
    return {
      US: ["CA", "TX", "NY", "FL", "IL"],
      CA: ["ON", "QC", "BC", "AB", "MB"],
      IN: ["MH", "DL", "KA", "TN", "UP"],
      AU: ["NSW", "VIC", "QLD", "WA", "SA"],
    }; // Sample states for selected countries
  }

  static isValid(value: string, country: string): boolean {
    return States.supportedStates[country]?.includes(value.toUpperCase()) || false;
  }

  toString(): string {
    return `${this.value}, ${this.country}`;
  }
}

export default States;