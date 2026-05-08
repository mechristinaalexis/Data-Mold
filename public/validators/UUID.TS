class UUID {
  value: string;

  constructor(value: string) {
    if (!UUID.isValid(value)) {
      throw new Error("Invalid UUID format");
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export default UUID;
