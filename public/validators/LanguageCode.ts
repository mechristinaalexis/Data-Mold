class LanguageCode {
  value: string;

  constructor(value: string) {
    if (!LanguageCode.isValid(value)) {
      throw new Error("Invalid language code");
    }
    this.value = value;
  }

  static get supportedLanguages(): string[] {
    return [
      "en", "es", "fr", "de", "zh", "ja", "ru", "ar", "hi", "pt"
    ]; //  ISO 639-1 language codes
  }

  static isValid(value: string): boolean {
    return LanguageCode.supportedLanguages.includes(value.toLowerCase());
  }

  toString(): string {
    return this.value;
  }
}

export default LanguageCode;
