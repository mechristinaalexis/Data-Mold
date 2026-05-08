class PhoneNumber {
  value: string;

  constructor(value: string) {
    if (!PhoneNumber.isValid(value)) {
      throw new Error("invalid phone number format");
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; 
    return phoneRegex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export default PhoneNumber;
