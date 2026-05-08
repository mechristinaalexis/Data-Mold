class JSONString {
  value: string;

  constructor(value: string) {
    if (!JSONString.isValid(value)) {
      throw new Error("Invalid JSON format");
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  toString(): string {
    return this.value;
  }
}

export default JSONString;