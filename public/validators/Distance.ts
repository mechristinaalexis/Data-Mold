class Distance {
  value: number;
  unit: string;

  constructor(value: string, unit: string) {
    if (!Distance.isValid(value, unit)) {
      throw new Error("invalid distance format or unit");
    }

    this.value = parseFloat(value);
    this.unit = unit;
  }

  static get units(): string[] {
    return ["mm", "cm", "dm", "m", "dam", "hm", "km"];
  }

  static isValid(value: string, unit: string): boolean {
    const valueRegex = /^\d+(\.\d+)?\s?$/;
    return valueRegex.test(value) && Distance.units.includes(unit);
  }

  toString(): string {
    return `${this.value} ${this.unit}`;
  }
}

export default Distance;
