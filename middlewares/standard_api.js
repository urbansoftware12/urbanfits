import { sendAdminNotification } from "@/utils/send_notification";
import User from "@/models/user";
import ConnectDB from "@/utils/connect_db";
import jwt, { decode } from "jsonwebtoken"
import mongoose from "mongoose";
import CorsMiddleware from "@/utils/cors-config";
import { adminRoles } from "@/uf.config";
import cookie from "cookie";

export default async function StandardApi(req, res, { method = "GET", verify_user = true, verify_admin = false }, next) {
    try {
        await CorsMiddleware(req, res)
        if (req.method === method) {

            // if (verify_user || verify_admin) try {
            //     const { "session-token": sessionToken } = cookie.parse(req.headers.cookie || '')
            //     if (!sessionToken) return res.status(401).json(sessionError);
            //     const decodedToken = jwt.verify(sessionToken, process.env.NEXT_PUBLIC_SECRET_KEY);
            //     if (!mongoose.Types.ObjectId.isValid(decodedToken._id)) throw new Error("invalid session token");
            //     if (jwt.decode(decodedToken.user_agent) !== req.headers['user-agent']) throw new Error("invalid session token");
            //     if (verify_admin) {
            //         await ConnectDB()
            //         let admin = await User.findById(admin_id)
            //         if (!admin || !adminRoles.includes(admin.role)) throw new Error("invalid session token");
            //         req.admin = admin;
            //     }
            //     req.user_id = decodedToken._id;

            // } catch (error) {
            //     console.log(error)
            //     return res.status(401).json({ success: false, error, msg: "Your session is invalid or expired. Please sign in again." })
            // }


            // if (verify_admin) try {
            //     const { authorization } = req.headers
            //     const authToken = authorization.split(" ")[1]
            //     if (authorization?.split(" ")[0] !== "Bearer" || !authToken) throw new Error()
            //     const decodedToken = jwt.verify(authToken, process.env.NEXT_PUBLIC_SECRET_KEY);
            //     const admin_id = decodedToken._doc._id
            //     if (!mongoose.Types.ObjectId.isValid(admin_id)) throw new Error()

            //     await ConnectDB()
            //     let admin = await User.findById(admin_id)
            //     if (admin || adminRoles.includes(admin.role)) req.admin = admin;
            //     else throw new Error();
            // } catch (error) {
            //     console.log(error)
            //     return res.status(403).json({ success: false, error, msg: "Invalid auth token, admin access denied." })
            // }
            await next()
        } else return res.status(405).json({ success: false, msg: `Method not allowed, Allowed methods: '${method}` })
    } catch (error) {
        console.log(error);
        await sendAdminNotification({
            category: "system",
            data: {
                title: "System Error",
                msg: `A system error occurred in "${req.url}" .`,
                description: `Error Message: ${error.message}\n Stack trace: ${error.stack}`,
                type: "error"
            }
        })
        return res.status(500).json({ success: false, msg: "Internal Server Error occurred, please try again in a while.", error })
    }
}