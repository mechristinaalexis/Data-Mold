class Temperature {
    constructor(value, unit) {
        if (!Temperature.isValid(value, unit)) {
            throw new Error("invalid temperature format or unit");
        }
        this.value = parseFloat(value);
        this.unit = unit;
    }
    static get units() {
        return ["C", "F", "K"];
    }
    static isValid(value, unit) {
        const valueRegex = /^-?\d+(\.\d+)?$/;
        return valueRegex.test(value) && Temperature.units.includes(unit);
    }
    toString() {
        return `${this.value} ${this.unit}`;
    }
}
export default Temperature;
