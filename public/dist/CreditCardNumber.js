class CreditCardNumber {
    constructor(value) {
        if (!CreditCardNumber.isValid(value)) {
            throw new Error("invalid credit card number");
        }
        this.value = value;
    }
    static isValid(value) {
        const sanitized = value.replace(/\D/g, "");
        if (sanitized.length < 13 || sanitized.length > 19) {
            return false;
        }
        return CreditCardNumber.luhnCheck(sanitized);
    }
    static luhnCheck(value) {
        let sum = 0;
        let shouldDouble = false;
        for (let i = value.length - 1; i >= 0; i--) {
            let digit = parseInt(value.charAt(i), 10);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    }
    toString() {
        return this.value;
    }
}
export default CreditCardNumber;
