class CurrencyAmount {
  value: number;
  currency: string;

  constructor(value: string, currency: string) {
    if (!CurrencyAmount.isValid(value, currency)) {
      throw new Error("invalid currency amount or currency code");
    }
    this.value = parseFloat(value);
    this.currency = currency;
  }

  static get supportedCurrencies(): string[] {
    return ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"];
  }

  static isValid(value: string, currency: string): boolean {
    const valueRegex = /^-?\d+(\.\d{1,2})?$/;
    return valueRegex.test(value) && CurrencyAmount.supportedCurrencies.includes(currency);
  }

  toString(): string {
    return `${this.value.toFixed(2)} ${this.currency}`;
  }
}

export default CurrencyAmount;
