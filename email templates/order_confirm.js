const OrderConfirmed = (orderData, isGiftCard = false) => {
    if (isGiftCard) return `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
<html lang="en">

<head></head>
<div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
    Your Order has been placed, thanks for shopping with us!<div>
    </div>
</div>

<body
    style="background-color:#0a0a0a; color: #ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%"
        style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tr style="width:100%">
            <td><img alt="Urban Fits"
                    src="${process.env.NEXT_PUBLIC_BASE_IMG_URL}/website-copyrights/logo_gold_outlined.webp" width="100"
                    style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto;margin-top:7rem" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">Dear ${orderData.name || "User"},</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Thanks for shopping with us! We look forward to
                    you so that we can provide you the best.</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">This is an order confimation email to inform
                    you that your order has been placed and delivered successfully.</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Below is your Order Information:</p><br>

                <div style="width: 100%; margin: 2rem 0 3rem 0; text-align: center;">
                    Order Reference: <span style="color: #FF4A60; font-weight: 600;">{orderID}</span>
                </div>
                <table align="center" role="presentation" cellPadding="10" width="100%"
                    style="max-width:37.5em;margin:0 auto;padding: 18px; border: 1px solid #ffff; border-radius: 12px;">
                    <tr>
                        <td>Gift Card(s)</td>
                        <td>For</td>
                    </tr>
                    ${orderData.gift_cards.map(giftCard => `<tr>
                        <td style="color: #FF4A60; font-weight: 600; text-decoration: none;">AED ${giftCard.price}</td>
                        <td style="color: #FF4A60; font-weight: 600; text-decoration: none;">${giftCard.buy_for}</td>
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
    Your Order has been placed, thanks for shopping with us!<div>
    </div>
</div>

<body
    style="background-color:#0a0a0a; color: #ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%"
        style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
        <tr style="width:100%">
            <td><img alt="Urban Fits"
                    src="${process.env.NEXT_PUBLIC_BASE_IMG_URL}/website-copyrights/logo_gold_outlined.webp" width="100"
                    style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto;margin-top:7rem" />
                <p style="font-size:16px;line-height:26px;margin:16px 0">Dear ${orderData.name || "User"},</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Thanks for shopping with us! We look forward to
                    you so that we can provide you the best.</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">This is an order confimation email to inform
                    you that your order has been placed and will be on it's way to your door step.</p>
                <p style="font-size:16px;line-height:26px;margin:16px 0">Below is your Order Information:</p><br>

                <table align="center" role="presentation" cellPadding="10" width="100%"
                style="max-width:37.5em;margin:0 auto;padding: 18px; border: 1px solid #ffff; border-radius: 12px;">
                <tr>
                    <td>Order ID:</td>
                    <td style="color: #FF4A60; font-weight: 600;">${orderData._id.toString()}</td>
                </tr>
                <tr>
                    <td>Tracking Number:</td>
                    <td style="color: #FF4A60; font-weight: 600;">${orderData.tracking_number}</td>
                </tr>
                <tr>
                    <td>Tracking URL:</td>
                    <td style="color: #FF4A60; font-weight: 600; text-decoration: none;">${orderData.tracking_url}</td>
                </tr>
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
}
export default OrderConfirmed