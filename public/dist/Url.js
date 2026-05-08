class Url {
    constructor(value) {
        if (!Url.isValid(value)) {
            throw new Error("invalid URL format");
        }
        this.value = value;
    }
    static isValid(value) {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        return urlRegex.test(value);
    }
    toString() {
        return this.value;
    }
}
export default Url;
