const FAQs = [
    {
        q: "UrbanFits collaboration",
        a: `
        You will find a dedicated section in our <a class="underline" href="/faq" >FAQ</a> for Urban Fits collaboration.
        `,
        tags: ['frequently asked questions']
    },
    {
        q: "Where can I find my order?",
        a: `
        You can check the status of your order and follow the delivery process at any time. <br /><br />
        To do this, enter the order number (from the email you received) on the <a class="underline" href="/trackorder" >Track your order</a> page.<br /><br />
        If you have an account, you can view all the information about your order in your <a class="underline" href="/user/personalinfo" >My Account</a> area. If you do not have an account yet, sign up now to benefit from exclusive services.
        `,
        tags: ['frequently asked questions']
    },
    {
        q: "Where can I find my invoice?",
        a: `
        URBANFITS.AE issues an invoice for every order placed. This document will be sent as an attachment with the delivery confirmation email for your package, and can also be viewed via your <a class="underline" href="/user/personalinfo" >Customer Account</a>.<br /><br />
        Please note: once the order has been confirmed, you will not be able to change the information you have entered, nor will we be able to issue a new invoice.
        `,
        tags: ['frequently asked questions']
    },
    {
        q: "Can I cancel my order ?",
        a: `
        We're sorry, but once your order has been confirmed, it is automatically processed and therefore cannot be canceled. However, you may return the package to us as outlined in our Returns Policy.
        `,
        tags: ['frequently asked questions']
    },
    {
        q: "What is your returns policy?",
        a: `
        You may return any item purchased on URBANFITS.AE within 10 days of the delivery date by following the instructions below:<br /><br />
        &nbsp;&nbsp;&nbsp; 1. Fill in the Online Return Form to generate your return label.<br />
        &nbsp;&nbsp;&nbsp; 2. Make sure that the items are in their original condition and that all labels are attached. If you fail to do so, we will not be able to accept the returned goods or give you a refund.<br />
        &nbsp;&nbsp;&nbsp; 3. Complete the online return form to generate your return label:  <a class="underline" href="/user/orders/returns" >HTTPS://URBANFITS.AE/USER/ORDERS/RETURNS</a><br />
        &nbsp;&nbsp;&nbsp; 4. Print and visibly stick the DHL return label on top of the previous one.<br />
        &nbsp;&nbsp;&nbsp; 5. Contact DHL by phone or online to arrange for collection of your package from your desired location.<br /><br />
        We normally process returns within 3 working days of receipt in our warehouse. During busy periods, this can take up to 7 working days. Once your refund has been accepted, we will send you a confirmation email.<br /><br />
        Refunds will be made on items returned in accordance with the above conditions. If the return doesn't meet the conditions, the package will be returned to you. <br /><br />
        Due to merchandising restrictions, all returns must be made from the country where the order was placed.<br /><br />
        Masks, underwear and swimwear cannot be returned.<br /><br />
        For more information on the conditions for exercising your right of withdrawal, please consult the Legal notice.
        `,
        tags: ['frequently asked questions']
    },
    {
        q: "What is Order Status?",
        a: `
        1. Order in progress : the order has been confirmed and we have already sent you a confirmation email containing the order number. <br /><br />
        2. Order shipped : as soon as your order leaves our warehouse, we will send you an email confirmation with the tracking number. <br /><br />
        You can check the status of your order at any time by entering the order number on the <a class="underline" href="/trackorder" >Track your order </a> page. <br />
        Registered users can also access their order information in the <a class="underline" href="/user/personalifo" >My Account</a> area.
        `,
        tags: ['orders']
    },
    {
        q: "Where can I find my order?",
        a: `
        You can check the status of your order and follow the delivery process at any time. <br /><br />
        To do this, enter the order number (from the email you received) on the <a href="/trackorder" class="underline" >Track your order</a> page. <br /><br />
        If you have an account, you can view all the information about your order in your "<a href="/user/personalinfo" class="underline" >My Account</a>" area. If you do not have an account yet, sign up now to benefit from exclusive services.
        `,
        tags: ['orders']
    },
    {
        q: "I placed my order more than 24 hours ago and still haven't received any email confirmation. What should I do?",
        a: `
        Check your "Junk Email" folder and make sure that the "no-reply@urbanfits.ae" addresses are on your email account's approved senders list.<br /><br />
        This means that our emails will no longer be blocked by your spam filter in the future.<br />
        If the problem persists, <a class="underline" href="/contact" >contact us</a>.
        `,
        tags: ['orders']
    },
    {
        q: "What can I do if I have not yet received my order?",
        a: `
        If your order has not been delivered within the estimated delivery time, we recommend contacting the courier on the Track your order page. <br /><br />
        Check the status of your order:<br />
        1. Go to the "<a class="underline" href="/user/order/orders" >My Orders</a>" section of your account, or enter the order number from your order confirmation email on the "<a class="underline" href="/trackorder" >Track your order</a>" page.<br />
        2. Check that the delivery address is correct.<br /><br />
        For assistance, <a class="underline" href="/contact" >contact us</a>. We will be happy to help you.
        `,
        tags: ['orders']
    },
    {
        q: "Can I change my order, add or remove products?",
        a: `
        Unfortunately, this is not possible. Each order is processed separately, and once your order has been confirmed, it is impossible to change the details or cancel your order. <br />
        If you wish to purchase other items, you must place a new order. If you wish to return items, please see our <a class="underline" href="/returnspolicy" >Returns Policy</a>.
        `,
        tags: ['orders']
    },
    {
        q: "Can I cancel my order?",
        a: `We're sorry, but once your order has been confirmed, it is automatically processed and therefore cannot be canceled. However, you may return the package to us as outlined in our <a class="underline" href="/returnspolicy" >Returns Policy</a>.`,
        tags: ['orders']
    },
    {
        q: "What are Delivery times?",
        a: `
        Standard delivery<br />
           Delivery made within 4-6 working days<br />
           $ 12 <br /><br />
        Express delivery<br />
          Delivery made within 2-4 working days<br />
          $ 20<br /><br />
        Deliveries are made during business hours Monday to Friday, except on public holidays. The courier will make 3 delivery attempts; after the third attempt, the package will be redirected to our warehouse.<br /><br />
        Please note: once the order has been confirmed, you will not be able to change your delivery address. As all orders are processed automatically, it is not possible for us to change dispatch and delivery times.<br /><br />
        You will receive an email with a link to track your order as soon as your package leaves our warehouse. You can also visit the <a class="underline" href="/trackorder" >Track Your Order</a> section to check the status of your order.
        `,
        tags: ['delivery']
    },
    {
        q: "What are Delivery restrictions?",
        a: `
        At the moment, we are not able to ship to the French overseas departments or to PO Boxes. Orders to any of these destinations will be canceled. <br /><br />
        The delivery address of your order must correspond to the country of the site on which you placed it. Orders placed from a different country to the delivery address will be automatically canceled. Please select the country you wish to send your order to from the link on each page.
        `,
        tags: ['delivery']
    },
    {
        q: "Can I choose a delivery date/time ?",
        a: `
        Unfortunately, you cannot choose a delivery date and time. However, you can try to contact the courier directly to arrange a delivery date.
        `,
        tags: ['delivery']
    },
    {
        q: "Where do you ship my order from?",
        a: `
        All orders are shipped from our warehouse in Dubai, United Arab Emirates.
        `,
        tags: ['delivery']
    },
    {
        q: "Where to Find your size?",
        a: `
        The size shown on the item's label is indicated on each product page and is converted into your country's corresponding size.<br /><br />
        To find the size you are looking for, you can use the <a class="underline" href="/trackordercustomerservices/sizeguide >Size Guide</a>: this is an indicative size scale (ranging from XXS to XXXL) that allows us to group all sizes in one system.<br /><br />
        See the <a class="underline" href="/customerservices/sizeguide" >Size Guide</a> section accessible from our product pages for more information.
        `,
        tags: ['sizing']
    },
    {
        q: "Pre-Order",
        a: `
        With a pre-order, you can reserve an item before it is available for sale. You can find the estimated shipping date on the product page for pre-order items.<br /><br />
        Orders made up of pre-order items with different delivery dates: all items will be dispatched together on the latest estimated shipping date.<br /><br />
        In any case, you will receive a confirmation email as soon as your package is shipped.<br /><br />
        Pre-order items can only be purchased by credit card. Once your order is complete, we will ask your bank to verify the bank details you have entered.<br /><br />
        In order to confirm the validity of your credit card, your order may be subject to a payment authorization of 1 $, which will not be charged. Your credit card will only be charged when your package is shipped.
        `,
        tags: ['shopping']
    },
    {
        q: "Orders placed on urbanfits.ae",
        a: `
        If you wish to make purchases on <a class="underline" href="/" >URBANFITS.AE</a>, you do not need to create an account. However, we recommend creating an account to benefit from areas and services reserved exclusively for our customers.<br /><br />
        &nbsp;&nbsp;&#8226; Search for an item<br />
        To browse our catalog with ease, use our navigation menu to choose an item category or discover all our selections on our homepage. If you are looking for a specific item, you can use our filters or our internal search engine.<br /><br />
        &nbsp;&nbsp;&#8226; Product information<br />
        For each item, you'll find a product page with the available sizes and colors, as well as a detailed description and composition. Click on the product image to enlarge it and see all the details.<br /><br />
        &nbsp;&nbsp;&#8226; How to place your order:
        &nbsp;&nbsp; 1. on the product page, select the color and size of your choice ;
        &nbsp;&nbsp; 2. add the product to your Shopping Bag ;
        &nbsp;&nbsp; 3. once you have finished shopping, click "Proceed to Purchase" ; 
        &nbsp;&nbsp; 4. enter your email and delivery address ; 
        &nbsp;&nbsp; 5. then choose the delivery method and payment method ; 
        &nbsp;&nbsp; 6. check that you have entered your details correctly, then click on the "Purchase Now" button. <br /> <br />
        If you are paying by credit card, you may be asked for a second authentication to authorize the payment before you finalize your purchase. In this case, you will have to enter a unique password, an SMS code or use another authentication method provided by your bank.<br /> <br />
        Within a few minutes you will receive a confirmation email with all the details of your order. From that moment on, our warehouse takes care of everything. You will receive a confirmation email as soon as your order is shipped.
        `,
        tags: ['shopping']
    },
    {
        q: "Technical assistance",
        a: `
        Our website display is optimized for all the latest versions of the main internet browsers. Check that the internet browsers you usually use are up to date.<br /><br />
        If you are experiencing browsing problems, we recommend:<br /><br />
        1. deleting all cookies and temporary files stored on your computer<br />
        2. checking that Javascript is enabled.<br /><br />
        If you're still having problems, please <a class="underline" href="/contact" >get in touch</a> and provide us with the following information:<br /><br />
        your operating system (Windows Vista, Mac OS X, etc.)<br />
        your internet browser and which version you're running (Internet Explorer 9, Firefox, Safari, etc.)<br />
        the URL you are trying to access (e.g. WWW.URBANFITS.AE).
        `,
        tags: ['shopping']
    },
    {
        q: "Fast Checkout",
        a: `
        Save your credit card details so you don't have to enter them every time you order. You can save several credit cards. The card specified as the default card will be selected automatically for each payment. In addition, you can save several addresses and choose the one you use most often as your "favorite". <a class="underline" href="/" >URBANFITS.AE</a> makes sure to use the highest security standards in data management.
        `,
        tags: ['shopping']
    },
    {
        q: "How do Promotional Codes work?",
        a: `
        URBANFITS.AE promotional codes allow you to take advantage of exclusive promotions and initiatives. To receive your promotional codes, subscribe to the Newsletter. If you wish to take advantage of a particular promotion, enter the code in the field indicated on the payment page <br />
        You can only use one promotional code per order. If the code is not valid, check the newsletter for the valid dates of the promotion and the product categories concerned.
        `,
        tags: ['shopping']
    },
    {
        q: "Can I make purchases from my mobile device?",
        a: `
        Of course! You can use the version of our website that's specially optimised for mobile devices.
        `,
        tags: ['shopping']
    },
    {
        q: "Benefits of registering",
        a: `
        Create an account to have access to exclusive services and sections reserved for our customers: My Orders, Fast Checkout.<br/><br/>
        When you register, URBANFITS.AE recognises the country you are in and automatically associates it with your account. Your account will therefore only be active on the version of the site corresponding to your country.
        `,
        tags: ['my account']
    },
    {
        q: "How can I unsubscribe from your Newsletter ?",
        a: `
        If you no longer wish to receive our Newsletter, you can unsubscribe at any time by clicking on the Unsubscribe link at the bottom of the Newsletter. This will open a web page where you can confirm your unsubscription.<br/><br/>
        You may receive further communications while your request is being processed. We apologise in advance for any inconvenience this may cause you.
        `,
        tags: ['my account']
    },
    {
        q: "Forgotten password ?",
        a: `
        In order to reset your password, provide the email address linked to your account to receive a password recovery email. To do so, click on the following link <a class="underline" href="/forgotpassword" >Forgotten password</a>.
        `,
        tags: ['my account']
    },
    {
        q: "Newsletter",
        a: `
        When you subscribe to our Newsletter, you can:<br/>
        be among the first customers to know about URBANFITS.AE's new products;<br/>
        benefit from promotions reserved exclusively for our customers;<br/>
        receive our style advice<br/>
        ... And so much more!
                `,
        tags: ['my account']
    },
    {
        q: "How can I delete my account?",
        a: `
        If you wish to delete your URBANFITS.AE Account, please <a class="underline" href="/contact" >contact us</a>.
        `,
        tags: ['my account']
    },
    {
        q: "I cannot log in to my account. What should I do?",
        a: `
        When you register, URBANFITS.AE recognises the country you are in and automatically associates it with your account. Your account will therefore only be active on the version of the site corresponding to your country. If your email address or password for My Account are not recognised, please check that you are on the version of the site where your account is registered.<br/>
        If you have forgotten your password, click on the link "<a class="underline" href="/forgotpassword" >Forgot your password</a>?" found on the Login page and follow the instructions to change your password.<br/><br/>
        For assistance, <a class="underline" href="/contact" >contact</a> us. We will be happy to help you.
        `,
        tags: ['my account']
    },
    {
        q: "I haven't received the Newsletter. What should I do?",
        a: `
        Try adding the address "SUPPORT@URBANFITS.AE" to the list of approved senders in your email account. This way, future newsletters should not be blocked by your spam filter. If you still do not receive the Newsletter, please <a class="underline" href="/contact" >contact</a> us.
        `,
        tags: ['my account']
    },
    {
        q: "Return policy",
        a: `
        You may return any item purchased on URBANFITS.AE within 10 days of the delivery date by following the instructions below:<br/><br/>
        &nbsp;&nbsp;&nbsp; 1. Fill in the Online Return Form to generate your return label.<br/>
        &nbsp;&nbsp;&nbsp; 2. Make sure that the items are in their original condition and that all labels are attached. If you fail to do so, we will not be able to accept the returned goods or give you a refund.<br/>
        &nbsp;&nbsp;&nbsp; 3. Complete the online return form to generate your return label: HTTPS://URBANFITS.AE/ORDERS/RETURNS<br/>
        &nbsp;&nbsp;&nbsp; 4. Print and visibly stick the DHL return label on top of the previous one.<br/>
        &nbsp;&nbsp;&nbsp; 5. Contact DHL by phone or online to arrange for collection of your package from your desired location.<br/><br/>
        We normally process returns within 3 working days of receipt in our warehouse. During busy periods, this can take up to 7 working days. Once your refund has been accepted, we will send you a confirmation email.<br/><br/>
        Refunds will be made on items returned in accordance with the above conditions. If the return doesn't meet the conditions, the package will be returned to you. <br/><br/>
        Due to merchandising restrictions, all returns must be made from the country where the order was placed.<br/><br/>
        Masks, underwear and swimwear cannot be returned.<br/><br/>
        For more information on the conditions for exercising your right of withdrawal, please consult the <a class="underline" href="/legalnotice" >Legal</a> notice.
        `,
        tags: ['returns & refund']
    },
    {
        q: "Refunds",
        a: `
        Returns are usually confirmed within 3 working days after arriving at our warehouse. During busy periods, this can take up to 7 working days. Once your return has been confirmed, we will immediately request a refund and send you a confirmation email. <br /><br />
        The time taken to process refunds varies depending on the payment method used.<br /><br />
        &nbsp;&nbsp;&#8226;Credit card: our bank will refund you within 7 working days after sending the confirmation email. Next, the time it takes to recredit your credit card will depend on your card issuer.<br />
        &nbsp;&nbsp;&#8226;PayPal : the refund will be visible in your PayPal account within 24 hours from the date the confirmation email was sent.<br />
        Please ensure you have a bank account registered in the same country as the one in which you placed your order.
        `,
        tags: ['returns & refund']
    },
    {
        q: "Where can I check my refund status?",
        a: `
        You can check the status of your refund on <a class="underline" href="/trackorder" >Track your order</a> page.
        `,
        tags: ['returns & refund']
    },
    {
        q: "Can the refund be made to a different credit card than the one I used to pay for my order?",
        a: `
        For security reasons, refunds cannot be made to a different credit card than the one used to pay for the order.
        `,
        tags: ['returns & refund']
    },
    {
        q: "Where is the package I sent back?",
        a: `
        You can check the status of your return at any time using Track your return.
        `,
        tags: ['returns & refund']
    },
    {
        q: "I lost my return label. How can I get a new one?",
        a: `
        If you have lost your prepaid return label, it can be re-generated from your Online Account or from the <a class="underline" href="/user/orders/returns" >Online Return Form</a> section. You can also contact our <a class="underline" href="/customerservices" >Customer Care</a> who will assist you.
        `,
        tags: ['returns & refund']
    },
    {
        q: "Can I choose my own courier to return the items?",
        a: `
        Yes. If you want to use another courier, please note you will be responsible for the return shipping costs.<br/><br/>
        In this case, please send the package to the following address:<br/><br/>
        DUBAI, UNITED ARAB EMIRATES<br/>
        ADDRESS WILL BE ADDED HERE<br/><br/>
        Please note that if you do not use the return label provided, URBANFITS.AE is not responsible for the theft or loss of the parcel during transport. This is why we recommend using a tracked delivery service.
        `,
        tags: ['returns & refund']
    },
    {
        q: "Can I send back items from different orders in the same package?",
        a: `
        Of course. You can use one box and one return label.<br/><br/>
        For more information on return procedures, see the <a class="underline" href="/returnpolicy" >Return Policy</a>.
        `,
        tags: ['returns & refund']
    },
    {
        q: "I decided to keep my order, but have already completed the Return Form. What should I do?",
        a: `
        We are pleased you decided to keep your items. Don't worry, there's no need to contact us.
        `,
        tags: ['returns & refund']
    },
    {
        q: "I am returning a gift: who will be refunded?",
        a: `
        If the order was paid for by PayPal, Apple Pay or credit card, the refund will be paid to the account or credit card used. For security reasons, we are not allowed to make the refund to a different account or credit card.
        `,
        tags: ['returns & refund']
    }
]

export default FAQs