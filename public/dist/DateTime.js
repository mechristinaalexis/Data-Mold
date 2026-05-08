class DateTime {
    constructor(value) {
        if (!DateTime.isValid(value)) {
            throw new Error("invalid date-time format");
        }
        this.value = new Date(value);
    }
    static isValid(value) {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }
    toString() {
        return this.value.toISOString();
    }
}
export default DateTime;
