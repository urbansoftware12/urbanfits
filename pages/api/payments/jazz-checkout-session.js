import axios from "axios"
import CryptoJS from "crypto-js";
import StandardApi from "@/middlewares/standard_api";

const JazzCheckoutSession = async (req, res) => StandardApi(req, res, { method: "POST" }, async () => {
    const apiUrl = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction';

    const currentDate = new Date();

    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${currentDate.getFullYear()}${month}${day}${hours}${minutes}${seconds}`;

    const paymentData = {
        "pp_Version": "1.1",
        "pp_TxnType": "MWALLET",
        "pp_Language": "EN",
        "pp_MerchantID": process.env.NEXT_PUBLIC_JAZZ_MERCHANT_ID,
        "pp_Password": process.env.NEXT_PUBLIC_JAZZ_PASSWORD,
        "pp_TxnRefNo": `T${formattedDateTime}`,
        "pp_Amount": "10000",
        "pp_TxnCurrency": "PKR",
        "pp_TxnDateTime": formattedDateTime,
        "pp_BillReference": "billref",
        "pp_Description": "Description of transaction",
        "pp_TxnExpiryDateTime": formattedDateTime,
        "pp_ReturnURL": "https://st.urbanfits.ae",
        "ppmpf_1": "03123456789"
    }

    const voidData = {
        "pp_SubMerchantID": "",
        "pp_BankID": "",
        "pp_ProductID": "",
        "ppmpf_2": "",
        "ppmpf_3": "",
        "ppmpf_4": "",
        "ppmpf_5": ""
    }

    const concatenatedString = Object.keys(paymentData)
        .filter(key => key.startsWith("pp"))
        .sort()
        .map(key => paymentData[key])
        .join("&");

    const prependedConcatString = (process.env.NEXT_PUBLIC_JAZZ_INTEGRITY_SALT + "&" + concatenatedString);
    console.log("Here is the prepended concatenated payment string: ", prependedConcatString)
    // const prependedBytes = CryptoJS.enc.Utf8.parse(prependedConcatString);
    // const iso88591String = CryptoJS.enc.Latin1.stringify(prependedBytes);
    const pp_SecureHash = CryptoJS.HmacSHA256(prependedConcatString, process.env.NEXT_PUBLIC_JAZZ_INTEGRITY_SALT).toString(CryptoJS.enc.Hex).toUpperCase();

    // const finalPaymentPayload = {
    //     ...paymentData,
    //     ...voidData,
    //     pp_SecureHash
    // }
    console.log("\n", pp_SecureHash)
    const { data } = await axios.post(apiUrl, { ...paymentData, pp_SecureHash, ...voidData })

    return res.status(200).json({
        success: true,
        pp_SecureHash,
        data
        // finalPaymentPayload,
        // tartgetHash: "550507F47B16B0FBBFE31F0D6FF47AEE5F15AA139427D5F71867B97A42FAD61F",
        // tartgetAchieved: "550507F47B16B0FBBFE31F0D6FF47AEE5F15AA139427D5F71867B97A42FAD61F" === pp_SecureHash
    })

})
export default JazzCheckoutSession;