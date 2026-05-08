class Url {
  value: string;

  constructor(value: string) {
    if (!Url.isValid(value)) {
      throw new Error("invalid URL format");
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export default Url;
