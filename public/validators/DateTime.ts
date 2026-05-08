class DateTime {
  value: Date;

  constructor(value: string) {
    if (!DateTime.isValid(value)) {
      throw new Error("invalid date-time format");
    }
    this.value = new Date(value);
  }

  static isValid(value: string): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  toString(): string {
    return this.value.toISOString();
  }
}

export default DateTime;