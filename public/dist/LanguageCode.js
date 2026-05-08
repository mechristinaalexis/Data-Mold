class LanguageCode {
    constructor(value) {
        if (!LanguageCode.isValid(value)) {
            throw new Error("Invalid language code");
        }
        this.value = value;
    }
    static get supportedLanguages() {
        return [
            "en", "es", "fr", "de", "zh", "ja", "ru", "ar", "hi", "pt"
        ]; //  ISO 639-1 language codes
    }
    static isValid(value) {
        return LanguageCode.supportedLanguages.includes(value.toLowerCase());
    }
    toString() {
        return this.value;
    }
}
export default LanguageCode;
