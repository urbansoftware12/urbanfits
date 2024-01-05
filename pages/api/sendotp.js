import ConnectDB from "@/utils/connect_db"
import { generateGiftCode } from "@/utils/generatePassword"
import Product from "@/models/product"
import mongoose from "mongoose"
import sendSMS from "@/utils/sendSMS"

const SendOtp = async (req, res) => {
    try {
        if (req.method === 'PUT') {
            await ConnectDB()
            const { p_id, v_id, size } = req.body
            // const response = await generateGiftCode(10)

            const product = await Product.updateOne(
                {
                    _id: mongoose.Types.ObjectId(p_id)
                },
                {
                    $inc: {
                        "variants.$[v].sizes.$[s].quantity": -3
                    }
                },
                {
                    new: true,
                    arrayFilters: [
                        { "v._id": mongoose.Types.ObjectId(v_id) },
                        { "s.size": size }
                    ]
                }
            )

            res.status(200).json({
                success: true,
                // response,
                product
            })
        }
        else {
            res.status(405).json({ success: false, msg: "bad request, you are using wrong request method!" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, msg: "Internal server error, please try again later" })
    }
}
export default SendOtp