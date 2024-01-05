import { S3 } from "aws-sdk";
import CorsMiddleware from "@/utils/cors-config";

const GetSignedS3Url = async (req, res) => {
    try {
        if (req.method === "GET") {
            await CorsMiddleware(req, res)
            const { folder, fileName } = req.query
            if (!folder || !fileName) return res.status(403).json({ success: false, msg: "All parameters are required. Query parameters: folder, fileName" })
            const s3 = new S3({
                region: process.env.NEXT_PUBLIC_AWS_REGION,
                credentials: {
                    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
                    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
                },
                signatureVersion: 'v4'
            })
            const uploadUrl = await s3.getSignedUrlPromise("putObject", {
                Bucket: "urban-fits",
                Key: folder + `/${fileName}`
            })
            return res.status(200).json({
                success: true,
                uploadUrl
            })
        } else return res.status(405).json({ success: false, msg: "Method not allowed, Allowed methods: 'GET'" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error occurred, please trey again in a while.", error })
    }
}

export default GetSignedS3Url