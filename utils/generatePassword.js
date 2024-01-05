import Giftcard from "@/models/giftcard"
import ConnectDB from "./connect_db";
const CryptoJS = require("crypto-js")

export const generateRandomInt = (from, to) => {
    let randint = Math.floor(Math.random() * (to - from + 1)) + from;
    return randint
}
export const generateRandIntWithProbabilities = (numbers, probabilities) => {
    if (numbers.length !== probabilities.length) {
        throw new Error("Arrays 'numbers' and 'probabilities' must have the same length.");
    }

    // Calculate the total probability sum
    const totalProbability = probabilities.reduce((sum, probability) => sum + probability, 0);

    // Generate a random value between 0 and the total probability sum
    const randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomValue <= cumulativeProbability) {
            return numbers[i];
        }
    }
    // If no number is selected, return the last number
    return numbers[numbers.length - 1];
}

const generatePassword = (email) => {
    const length = generateRandomInt(8, 11);
    const key = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${email}abcdefghijklmnopqrstuvwxyz0123456789`;
    let password = "";

    // Generate a random password of the specified length
    for (let i = 0; i < length; i++) {
        const randomIndex = generateRandomInt(0, key.length)
        password += key.charAt(randomIndex)
    }
    return password
}

export const HashValue = (value) => {
    const hashed = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex)
    return hashed
}

export const EncrytOrDecryptData = (data, encrypt = true) => {
    if (typeof data !== "string") throw new Error("Encryption error: The data must be of type string.")
    if (encrypt) return CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY).toString()
    else {
        const bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY)
        return bytes.toString(CryptoJS.enc.Utf8)
    }
}

export const generateGiftCode = async (length) => {
    const key = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;

    await ConnectDB()
    let codeExists = true
    let code = "";
    while (codeExists) {
        // Generate a random password of the specified length
        for (let i = 0; i < length; i++) {
            const randomIndex = generateRandomInt(0, key.length)
            code += key.charAt(randomIndex)
        }
        const giftCard = await Giftcard.find({ gift_code: code })
        if (!giftCard.length) codeExists = false
        else code = ''
    }
    console.log(code)
    return code
}
export default generatePassword