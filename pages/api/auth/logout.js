import StandardApi from "@/middlewares/standard_api";
import { RemoveSessionCookie } from "@/utils/cyphers";

const Logout = async (req, res) => StandardApi(req, res, { method: "POST", verify_user: false }, async () => {
    RemoveSessionCookie(res)
    res.status(200).json({
        success: true,
        msg: "You are Logged out successfully !"
    })
})
export default Logout