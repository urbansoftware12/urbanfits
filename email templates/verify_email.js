const verifyEmail = (otp) => `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

<head></head>
<div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
    Please Confirm your OTP to change your Email.<div>
    </div>
</div>

<body
    style="background-color:#0a0a0a; color: #ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%"
        style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tr style="width:100%">
            <td><img alt="Urban Fits"
                    src="${process.env.NEXT_PUBLIC_BASE_IMG_URL}/website-copyrights/logo_gold_outlined.webp"
                    width="100"
                    style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto;margin-top:7rem" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">Welcome to the Urban Fits,</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Thanks for being a part of us, We're delighted to have you on board. You're now just one step away to shop with Urban Fits with personalized experience.</p> <br>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Below is your OTP to verify your email for registration:</p> <br>
                <span style="font-size:22px;line-height:26px;margin:auto;color:#23ff86;">${otp}</span> <br>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Please submit this code to the Urban Fits website prompt. This
                    OTP will expire within 5 minutes. If you didn't request this email by any means then please ignore it.</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Best Regards,<br />The Urban Fits team</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">Urban Fits L.L.C. &copy;
                    2023-2024 All rights reserved</p>
            </td>
        </tr>
    </table>
</body>
</html>`
export default verifyEmail