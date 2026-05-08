class States {
    constructor(value, country) {
        if (!States.isValid(value, country)) {
            throw new Error("invalid state or country");
        }
        this.value = value;
        this.country = country;
    }
    static get supportedStates() {
        return {
            US: ["CA", "TX", "NY", "FL", "IL"],
            CA: ["ON", "QC", "BC", "AB", "MB"],
            IN: ["MH", "DL", "KA", "TN", "UP"],
            AU: ["NSW", "VIC", "QLD", "WA", "SA"],
        }; // Sample states for selected countries
    }
    static isValid(value, country) {
        var _a;
        return ((_a = States.supportedStates[country]) === null || _a === void 0 ? void 0 : _a.includes(value.toUpperCase())) || false;
    }
    toString() {
        return `${this.value}, ${this.country}`;
    }
}
export default States;
