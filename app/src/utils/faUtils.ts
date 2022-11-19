export const isValidNationalCode = (code: string) => {
    if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;

    let sum = 0,
        chars = code.split(""),
        lastDigit,
        remainder;

    for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);

    remainder = sum % 11;
    lastDigit = remainder < 2 ? remainder : 11 - remainder;

    return +chars[9] === lastDigit;
};

export function validatePhoneNumber(phoneNum: string) {
    return /09\d{9}$/.test(phoneNum)
}

export const p2e = (s: string) => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d) + "")
export const a2e = (s: string) => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d) + "")
export const faNumConvertor = (s: string) => p2e(a2e(s))
