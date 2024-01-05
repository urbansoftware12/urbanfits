const newsletter_confirm_template = (username, interests) => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter Subscription Confirmation</title>
    <style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative&family=Kanit&family=Montserrat:wght@400;700&display=swap');
        body,
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        td {
            margin: 0;
            padding: 0;
        }

        body {
            width: 100%;
            height: 100vh;
            padding-top: 3rem;
            font-family: 'Montserrat', sans-serif;
            background-image: linear-gradient(109.6deg, rgba(15, 2, 2, 1) 11.2%, rgba(36, 163, 190, 1) 91.1%);
            color: #e7e7e7;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        .logo {
            margin-bottom: 20px;
        }
        .logo img{
            width: 100px;
        }

        h1 {
            font-family: 'Cinzel Decorative', 'Roboto', sans-serif;
            font-size: 32px;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        .interests {
            font-weight: bold;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
            font-size: 14px;
            color: #888888;
            text-align: center;
        }

        .footer p {
            margin-bottom: 10px;
        }

        .unsubscribe-btn {
            margin: 0 4px;
            font-family: 'Kanit', sans-serif;
            display: inline-block;
            padding: 2px 12px;
            background-color: #dddddd;
            border-radius: 8px;
            color: #333333;
            text-decoration: none;
        }

        li {
            text-align: left;
        }
        .footer-text{
            font-size: 12px;
        }

        @media screen and (max-width: 480px) {

            /* Responsive styles for smaller screens */
            h1 {
                font-size: 24px;
            }

            p {
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
            <!-- Insert your logo here -->
            <img src="https://urban-fits.s3.eu-north-1.amazonaws.com/website-copyrights/logo_gold_outlined.png"
                alt="Logo">
        </div>
        <h1>Welcome to Our Newsletter!</h1>
        <p>Dear ${username ? username : "Subsciber"}, thank you for subscribing to our newsletter. We are delighted to have you on board!</p>
        <p>You have subscribed based on the following interests:</p>
        <ul class="interests">
        ${interests.map((interest) => {
        return `<li style="text-transform: capitalize;" >${interest}</li>`
    }).join(" ")}
        </ul>
        <p>You will receive every update about our latest new coming exciting stocks and sales</p>
        <div class="footer">
            <p class="footer-text">Urban Fits L.L.C. &copy; 2023-2024 All rights reserved</p>
            <p class="footer-text" >
                You received this email because you subscribed to our newsletter.
                If you no longer wish to receive our emails, you can
                <a class="unsubscribe-btn" href="#">unsubscribe</a>.
            </p>
        </div>
    </div>
</body>

</html>
    `
}
export default newsletter_confirm_template