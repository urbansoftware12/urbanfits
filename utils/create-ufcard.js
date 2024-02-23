import User from "@/models/user"
import { generateRandomInt } from "./cyphers.js"
import uploadImage from "./uploadImage";
import bwipjs from 'bwip-js';

const createUFcard = async () => {
    let cardNumber = null
    let exists = true
    while (exists) {
        const timestamp = Date.now()
        const salt = generateRandomInt(1000, 9999)
        cardNumber = `705${timestamp}${salt}`

        const ufPointDoc = await User.findOne({ 'uf_wallet.card_number': cardNumber })
        if (!ufPointDoc) exists = false;
    }
    try {
        const barCode = await bwipjs.toBuffer({
            bcid: "code128",
            text: cardNumber,
            scale: 4,
        })
        const barCodeUrl = await uploadImage(barCode, `uf-wallet-barcodes/${cardNumber}`)
        return {
            card_number: cardNumber,
            bar_code: barCodeUrl
        }
    } catch (error) { console.log(error) }
}
export default createUFcard