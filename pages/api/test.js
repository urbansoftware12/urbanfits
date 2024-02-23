import ConnectDB from "@/utils/connect_db";
import UFpoints from "@/models/ufpoints";
import StandardApi from "@/middlewares/standard_api";
import { GetUFBalance, DeductPoints } from "@/utils/uf-points";
// import { getDateOfTimezone, SignJwt } from "@/utils/cyphers";

const TestApiHandler = (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    await ConnectDB()
    const { deduct } = req.body;

    const balance1 = await GetUFBalance("651ab014f10bff23784dd8e8", "70516962478225042990", "Asia/Karachi")
    console.log("balance before deduction: ", balance1)

    await DeductPoints("651ab014f10bff23784dd8e8", "70516962478225042990", "Asia/Karachi", deduct)

    const balance2 = await GetUFBalance("651ab014f10bff23784dd8e8", "70516962478225042990", "Asia/Karachi")
    console.log("balance after deduction: ", balance2)


    res.status(200).json({
        success: true,
        // msg: "terrafroming completed successfully",
        balance1, deduct, balance2
    })
})

export default TestApiHandler