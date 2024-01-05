import React from 'react'
import CutomerServices from '.'

export default function Orderinfo() {
    return (
        <CutomerServices>
            <h1 className="mb-7 text-lg lg:text-xl font_urbanist_bold">Order Information</h1>
            <div className="w-full mb-6 text-sm rounded-lg font_urbanist_light">
                Ordering in our online store is easy and convenient Cancellation, Availability.<br /><br />
                <h1 className="mb-3 font_urbanist_medium">Cancellation</h1>
                If you have placed an order in error we ask you to contact our customer service team.
                We will do our best to assist you any way we can.
                Please note! It’s important that you contact us as soon as possible. We always strive for quick deliveries, but this does mean that we may not have much time to cancel your order.
                We cannot make any changes (address, size, color) once your order has been placed
            </div>
            <div className="w-full mb-6 text-sm rounded-lg font_urbanist_light">
                <h1 className="mb-3 font_urbanist_medium">Product Availability</h1>
                Items in our online shop have stock and are ready to send. Any sizes that are out of stock are marked as unavailable.<br />
                On rare occasions at peak selling periods (sales and festive seasons) we may have some out of stock issues from customers ordering items at the same time.<br />
                When we are unable to ship an already ordered item, we will not charge your card with the price of the article.<br />
                We work hard to keep our stock levels as accurate as possible. Occasionally errors occur, although they are rare.<br />
                Our online collection is regularly replenished so it's worth checking back with us regularly.
            </div>
        </CutomerServices>
    )
}
