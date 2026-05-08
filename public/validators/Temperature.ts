class Temperature {
  value: number;
  unit: string;

  constructor(value: string, unit: string) {
    if (!Temperature.isValid(value, unit)) {
      throw new Error("invalid temperature format or unit");
    }

    this.value = parseFloat(value);
    this.unit = unit;
  }

  static get units(): string[] {
    return ["C", "F", "K"];
  }

  static isValid(value: string, unit: string): boolean {
    const valueRegex = /^-?\d+(\.\d+)?$/;
    return valueRegex.test(value) && Temperature.units.includes(unit);
  }

  toString(): string {
    return `${this.value} ${this.unit}`;
  }
}

export default Temperature;
