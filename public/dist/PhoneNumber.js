class PhoneNumber {
    constructor(value) {
        if (!PhoneNumber.isValid(value)) {
            throw new Error("invalid phone number format");
        }
        this.value = value;
    }
    static isValid(value) {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(value);
    }
    toString() {
        return this.value;
    }
}
export default PhoneNumber;
