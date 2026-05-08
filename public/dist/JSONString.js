class JSONString {
    constructor(value) {
        if (!JSONString.isValid(value)) {
            throw new Error("Invalid JSON format");
        }
        this.value = value;
    }
    static isValid(value) {
        try {
            JSON.parse(value);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    toString() {
        return this.value;
    }
}
export default JSONString;
