class SocialSecurityNumber {
    constructor(value) {
        if (!SocialSecurityNumber.isValid(value)) {
            throw new Error("Invalid Social Security Number format");
        }
        this.value = value;
    }
    static isValid(value) {
        const ssnRegex = /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
        return ssnRegex.test(value);
    }
    toString() {
        return this.value;
    }
}
export default SocialSecurityNumber;
