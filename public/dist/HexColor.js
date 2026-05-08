class HexColor {
    constructor(value) {
        if (!HexColor.isValid(value)) {
            throw new Error("Invalid hexadecimal color format");
        }
        this.value = value;
    }
    static isValid(value) {
        const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        return hexColorRegex.test(value);
    }
    toString() {
        return this.value;
    }
}
export default HexColor;
