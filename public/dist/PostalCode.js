class PostalCode {
    constructor(value, country) {
        if (!PostalCode.isValid(value, country)) {
            throw new Error("invalid postal code for the country");
        }
        this.value = value;
        this.country = country;
    }
    static get postalCodePatterns() {
        return {
            US: /^\d{5}(-\d{4})?$/, // 12345 or 12345-6789
            CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, // A1A 1A1
            IN: /^\d{6}$/, // 110001
            UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, // SW1A 1AA
            AU: /^\d{4}$/, // 2000
        };
    }
    static isValid(value, country) {
        var _a;
        return ((_a = PostalCode.postalCodePatterns[country]) === null || _a === void 0 ? void 0 : _a.test(value)) || false;
    }
    toString() {
        return `${this.value}, ${this.country}`;
    }
}
export default PostalCode;
