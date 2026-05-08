class CurrencyAmount {
    constructor(value, currency) {
        if (!CurrencyAmount.isValid(value, currency)) {
            throw new Error("invalid currency amount or currency code");
        }
        this.value = parseFloat(value);
        this.currency = currency;
    }
    static get supportedCurrencies() {
        return ["USD", "EUR", "GBP", "INR", "JPY", "CNY", "AUD", "CAD"];
    }
    static isValid(value, currency) {
        const valueRegex = /^-?\d+(\.\d{1,2})?$/;
        return valueRegex.test(value) && CurrencyAmount.supportedCurrencies.includes(currency);
    }
    toString() {
        return `${this.value.toFixed(2)} ${this.currency}`;
    }
}
export default CurrencyAmount;
