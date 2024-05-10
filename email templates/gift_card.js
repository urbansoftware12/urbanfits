const GiftCardTemplate = (giftData, giftCodes, isForSelf = false) => {
    if (isForSelf) return `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

<head></head>
<div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
    Congratulation, You've got a gift!<div>
    </div>
</div>

<body
    style="background-color:#0a0a0a; color: #ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" cellSpacing="0" cellPadding="0" border="0" width="100%"
        style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tr style="width:100%">
            <td><img alt="Urban Fits"
                    src="${process.env.NEXT_PUBLIC_BASE_IMG_URL}/website-copyrights/logo_gold_outlined.webp" width="100"
                    style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto;margin-top:7rem" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">Dear User,</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Congratulations, you received a ${giftData.price} AED
                    Gift Card(s).</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Below is your gift code inforamtion:</p><br>
                <table align="center" role="presentation" cellPadding="10" width="100%"
                    style="max-width:37.5em;margin:2rem auto;padding: 18px; border: 1px solid #ffff; border-radius: 12px;">
                    <tr>
                        <td>Index#</td>
                        <td>Code</td>
                    </tr>
                    ${giftCodes.map((code, index) => `<tr>
                        <td style="color: #FF4A60; font-weight: 600; text-decoration: none;">${index + 1}</td>
                        <td style="color: #FF4A60; font-weight: 600; text-decoration: none;">${code}</td>
                    </tr>`).join("")}
                </table>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Best Regards,<br />The Urban Fits team</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">Urban Fits L.L.C. &copy;
                    2023-2024 All rights reserved</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `
    else return `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

<head></head>
<div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
    Congratulation, You've got a gift!<div>
    </div>
</div>

<body
    style="background-color:#0a0a0a; color: #ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" cellSpacing="0" cellPadding="0" border="0" width="100%"
        style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tr style="width:100%">
            <td><img alt="Urban Fits"
                    src="${process.env.NEXT_PUBLIC_BASE_IMG_URL}/website-copyrights/logo_gold_outlined.webp" width="100"
                    style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto;margin-top:7rem" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">Dear ${giftData.receiver.name || "User"},</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Congratulations, you received a ${giftData.price} AED
                    Gift Card from ${giftData.sender.name}</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">${giftData.quantity} Gift Card(s) has been added in your Uban Fits
                    account, you can use the below given code(s) to use this on Urban Fits exclusively for any purchase.
                </p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Below is your gift code inforamtion:</p><br>

                <div style="width: 100%;">
                    <img style="display: block; width: 10rem; margin: 0 auto;"
                        src="${process.env.NEXT_PUBLIC_BASE_IMG_URL + giftData.cover}" alt="">
                </div>
                <table align="center" role="presentation" cellPadding="10" width="100%"
                    style="max-width:37.5em;margin:2rem auto;padding: 18px; border: 1px solid #ffff; border-radius: 12px;">
                    <tr>
                        <td>Index#</td>
                        <td>Code</td>
                    </tr>
                    ${giftCodes.map((code, index) => `<tr>
                        <td style="color: #FF4A60; font-weight: 600; text-decoration: none;">${index + 1}</td>
                        <td style="color: #FF4A60; font-weight: 600; text-decoration: none;">${code}</td>
                    </tr>`).join("")}
                </table>
                <p>Please save the gift code in a secure place, you will not be shown the code again as they're end to end encrypted.</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Best Regards,<br />The Urban Fits team</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">Urban Fits L.L.C. &copy;
                    2023-2024 All rights reserved</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `
}
export default GiftCardTemplate