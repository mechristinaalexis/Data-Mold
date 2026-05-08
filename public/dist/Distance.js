class Distance {
    constructor(value, unit) {
        if (!Distance.isValid(value, unit)) {
            throw new Error("invalid distance format or unit");
        }
        this.value = parseFloat(value);
        this.unit = unit;
    }
    static get units() {
        return ["mm", "cm", "dm", "m", "dam", "hm", "km"];
    }
    static isValid(value, unit) {
        const valueRegex = /^\d+(\.\d+)?\s?$/;
        return valueRegex.test(value) && Distance.units.includes(unit);
    }
    toString() {
        return `${this.value} ${this.unit}`;
    }
}
export default Distance;
