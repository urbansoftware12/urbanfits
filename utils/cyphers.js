import Giftcard from "@/models/giftcard"
import ConnectDB from "./connect_db";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { jwtExpiries, isProdEnv } from "@/uf.config";

export const generateRandomInt = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
export const HashValue = (value) => CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
export const SignJwt = (data, expiry) => jwt.sign(data, process.env.NEXT_PUBLIC_SECRET_KEY, expiry ? { expiresIn: expiry } : {});
export const DeleteCookie = (name) => document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
export const getDateOfTimezone = (timeZone = process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE) => new Date(new Date().toLocaleDateString('en-US', { timeZone }))
const getDateOfTimezoneIntl = (timeZone) => new Date(new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date()))

export const isValidTimeZone = (timeZone) => {
    try {
        new Date().toLocaleString('en', { timeZone });
        return true;
    } catch (error) { return false }
}

export const get12hFormatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hour = date.getHours();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour % 12 || 12} ${ampm}`;
}

export const generateRandIntWithProbabilities = (numbers, probabilities) => {
    if (numbers.length !== probabilities.length) throw new Error("Arrays 'numbers' and 'probabilities' must have the same length.");
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

export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        if (!result[item[key]]) result[item[key]] = [];
        result[item[key]].push(item);
        return result;
    }, {});
}

const generatePassword = (passLength) => {
    const length = passLength || generateRandomInt(8, 11);
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    // Generate a random password of the specified length
    for (let i = 0; i < length; i++) {
        const randomIndex = generateRandomInt(0, key.length)
        password += key.charAt(randomIndex)
    }
    return password
}

export const EncryptOrDecryptData = (data, encrypt = true) => {
    if (typeof data !== "string") throw new Error("Encryption error: The data must be of type string.")
    if (encrypt) return CryptoJS.AES.encrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY).toString()
    else return CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8)
}

export const SetSessionCookie = (req, res, sessionData, expiresAfter = jwtExpiries.default) => {
    const expiryDate = Math.floor(expiresAfter * 24 * 60 * 60);
    const sessionTokenCookie = serialize('session-token', SignJwt(sessionData, `${expiresAfter} days`), {
        httpOnly: true,
        sameSite: isProdEnv ? "none" : "lax",
        priority: "high",
        domain: isProdEnv ? ".urbanfits.ae" : "localhost",
        path: "/",
        secure: isProdEnv,
        maxAge: expiryDate
    })
    const isLoggedInCookie = serialize('is_logged_in', true, {
        httpOnly: false,
        sameSite: isProdEnv ? "none" : "lax",
        priority: "high",
        domain: isProdEnv ? ".urbanfits.ae" : "localhost",
        path: "/",
        secure: isProdEnv,
        maxAge: expiryDate
    })
    res.setHeader('Set-Cookie', [sessionTokenCookie, isLoggedInCookie]);
}

export const RemoveSessionCookie = (res) => {
    const sessionTokenCookie = serialize('session-token', "null", {
        httpOnly: true,
        sameSite: isProdEnv ? "none" : "lax",
        path: "/",
        domain: isProdEnv ? ".urbanfits.ae" : "localhost",
        secure: isProdEnv,
        maxAge: 0
    })
    const isLoggedInCookie = serialize('is_logged_in', false, {
        httpOnly: false,
        sameSite: isProdEnv ? "none" : "lax",
        path: "/",
        domain: isProdEnv ? ".urbanfits.ae" : "localhost",
        secure: isProdEnv,
        maxAge: 0
    })
    const guestSessionCooie = serialize('guest-session', false, {
        httpOnly: true,
        sameSite: isProdEnv ? "none" : "lax",
        path: "/",
        domain: isProdEnv ? ".urbanfits.ae" : "localhost",
        secure: isProdEnv,
        maxAge: 0
    })
    res.setHeader('Set-Cookie', [sessionTokenCookie, isLoggedInCookie, guestSessionCooie])
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