import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import StandardApi from "@/middlewares/standard_api";

const GetSignedS3Url = async (req, res) => StandardApi(req, res, { verify_user: false }, async () => {
    const { file_key } = req.query;
    if (!file_key) return res.status(403).json({ success: false, msg: "A valid `file_key` query parameter required." })

    const s3client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
        }
    });
    const putCommand = new PutObjectCommand({
        Bucket: "urban-fits",
        Key: file_key
    });
    const uploadUrl = await getSignedUrl(s3client, putCommand);

    return res.status(200).json({
        success: true,
        uploadUrl
    })
})
export default GetSignedS3Url