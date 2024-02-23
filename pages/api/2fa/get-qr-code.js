import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import StandardApi from '@/middlewares/standard_api';

const GetQrCode = async (req, res) => StandardApi(req, res, {}, async () => {
    const { user } = req;

    const secret = speakeasy.generateSecret({
        issuer: "Urban Fits",
        name: `Urban Fits: ${user.username}`,
        length: 30
    })
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url)
    res.status(200).json({
        success: true,
        qrSecret: secret.base32,
        qrCodeUrl
    })
})
export default GetQrCode