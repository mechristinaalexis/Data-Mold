class SocialSecurityNumber {
  value: string;

  constructor(value: string) {
    if (!SocialSecurityNumber.isValid(value)) {
      throw new Error("Invalid Social Security Number format");
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    const ssnRegex = /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
    return ssnRegex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export default SocialSecurityNumber;