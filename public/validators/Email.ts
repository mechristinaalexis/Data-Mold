class Email {
  value: string;

  constructor(value: string) {
    if (!Email.isValid(value)) {
      throw new Error("invalid email format");
    }

    this.value = value;
  }

  static isValid(value: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }

  toString(): string {
    return this.value;
  }
}

export default Email;
