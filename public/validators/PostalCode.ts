class PostalCode {
  value: string;
  country: string;

  constructor(value: string, country: string) {
    if (!PostalCode.isValid(value, country)) {
      throw new Error("invalid postal code for the country");
    }
    this.value = value;
    this.country = country;
  }

  static get postalCodePatterns(): Record<string, RegExp> {
    return {
      US: /^\d{5}(-\d{4})?$/, // 12345 or 12345-6789
      CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // A1A 1A1
      IN: /^\d{6}$/, // 110001
      UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, // SW1A 1AA
      AU: /^\d{4}$/, // 2000
    };
  }

  static isValid(value: string, country: string): boolean {
    return PostalCode.postalCodePatterns[country]?.test(value) || false;
  }

  toString(): string {
    return `${this.value}, ${this.country}`;
  }
}

export default PostalCode;
