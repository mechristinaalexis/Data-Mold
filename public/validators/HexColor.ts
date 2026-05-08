class HexColor {
  value: string;

  constructor(value: string) {
    if (!HexColor.isValid(value)) {
      throw new Error("Invalid hexadecimal color format");
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexColorRegex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export default HexColor;