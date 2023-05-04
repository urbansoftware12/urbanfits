import React, { useState, useEffect } from 'react'
import { useCart } from 'react-use-cart';
import CheckoutCalcSection from '@/components/checkoutCalcSection';
import CheckoutForm from '@/components/checkoutform';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

export default function Checkout2() {
    const [clientSecret, setClientSecret] = useState("");
    const { isEmpty, totalUniqueItems, items, cartTotal } = useCart()

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/payments/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ costs: { total: cartTotal, otherCosts: { shipping: 3.94, tax: 4.28 } } }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    if (isEmpty) return <ErrorPage type="error" heading="Oh Snap! There's Nothing For Checkout" message="You currently have nothing to checkout in your cart, please visit our store and select something to purchase" />
    if (!isEmpty) return (
        <>
            <Navbar />
            <main className={`bg-white w-full layout_height transition-all duration-700 overflow-x-hidden overflow-y-scroll`}>
                <div className="w-full pb-20 flex justify-center">
                    <section className='w-full md:w-3/4 lg:w-[90%] h-full flex flex-col lg:flex-row justify-between p-5 md:p-7 lg:p-0 lg:pt-9 font_gotham text-left pt-5' >
                        <div className="Stripe_container">
                            {clientSecret && (
                                <Elements options={{
                                    clientSecret,
                                    appearance: { theme: 'flat', },
                                }}
                                    stripe={stripePromise}>
                                    <CheckoutForm />
                                </Elements>
                            )}
                        </div>
                        <CheckoutCalcSection />
                    </section>
                </div>
                <Footer />
            </main >
        </>
    )
}
