class Email {
    constructor(value) {
        if (!Email.isValid(value)) {
            throw new Error("invalid email format");
        }
        this.value = value;
    }
    static isValid(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }
    toString() {
        return this.value;
    }
}
export default Email;
