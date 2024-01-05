import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const verifyAdminToken = (req, res) => {
    const { authorization } = req.headers
    try {
        const authToken = authorization.split(" ")[1]
        if (authorization?.split(" ")[0] !== "Bearer" || !authToken) throw new Error()
        const decodedToken = jwt.verify(authToken, process.env.NEXT_PUBLIC_SECRET_KEY);
        const admin_id = decodedToken._doc._id
        if (!mongoose.Types.ObjectId.isValid(admin_id)) throw new Error()
        return admin_id;
    } catch (error) {
        console.log(error)
        res.status(403).json({ success: false, error, msg: "Invalid auth token, admin access denied." })
        throw Error()
    }
}
export default verifyAdminToken