import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import Accordian from '@/components/accordians/accordian';
import { giftCardPrices, giftCardMethods, giftCardCovers } from '@/uf.config';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useCart } from 'react-use-cart';
import useWallet from '@/hooks/useWallet';
import toaster from '@/utils/toast_function';

const PriceBtn = ({ price, giftPrice, setGiftPrice }) => {
    const selected = price === giftPrice;
    return <button key={price} onClick={setGiftPrice} className={`px-2 md:px-4 py-2 border hover:border-pinky hover:bg-white ${selected ? "bg-white border-pinky shadow-lg" : "bg-gray-100"} rounded-lg text-[10px] md:text-xs lg:text-sm font-semibold transition-all`}>
        AED {price}
    </button>
}

export default function Giftcard() {
    const { user, isLoggedIn } = useUser();
    const router = useRouter();
    const [translate, setTranslate] = useState(1);
    const [coverType, setCoverType] = useState("birthday_covers");
    const [giftcardConflictWarning, setGiftcardConflictWarning] = useState(false);
    const { addItem, inCart, items, emptyCart } = useCart();

    const { values, errors, handleChange, handleReset, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            price: giftCardPrices[0],
            quantity: 1,
            buy_for: "friend",
            cover: '',
            receiver: {
                name: "",
                email: ""
            },
            sender: {
                name: user?.firstname + " " + user?.lastname,
                message: ""
            }
        },
        validationSchema: Yup.object().shape({
            price: Yup.number().required(),
            quantity: Yup.number().min(1).max(5).required(),
            buy_for: Yup.string().oneOf(["friend", "self"]).required(),
            cover: Yup.string().when("buy_for", {
                is: "friend",
                then: Yup.string().required(),
                otherwise: Yup.string().notRequired()
            }),
            receiver: Yup.object().when("buy_for", {
                is: "friend",
                then: Yup.object().shape({
                    name: Yup.string().required(),
                    email: Yup.string().email().required(),
                }),
                otherwise: Yup.object().shape({
                    name: Yup.string().notRequired(),
                    email: Yup.string().notRequired(),
                }).notRequired()
            }),
            sender: Yup.object().when("buy_for", {
                is: "friend",
                then: Yup.object().shape({
                    name: Yup.string().required(),
                    message: Yup.string()
                }),
                otherwise: Yup.object().shape({
                    name: Yup.string(),
                    message: Yup.string()
                })
            })
        }),
        onSubmit: (values) => {
            const giftCardId = "giftcard-" + values.price;
            const notGifts = items.find(item => !item.is_giftcard)
            if (notGifts) {
                setGiftcardConflictWarning(true);
                return toaster("info", "You can't add/checkout gift card along with other items, please refer to the Giftcard Terms.")
            }
            else if (inCart(giftCardId)) return toaster("info", "Already in cart")

            const giftCardData = {
                ...values,
                id: giftCardId,
                is_giftcard: true
            }
            addItem(giftCardData, values.quantity)
            toaster("success", "Giftcard added to the cart")
        }
    })

    const isError = Object.keys(errors).length > 0;

    const checkOut = () => {
        if (isError) return toaster("Please fill out all the information")
        handleSubmit();
        router.push("/checkout")
    }


    return <>
        <main className='w-full p-5 md:p-7 lg:p-14 xl:p-16 2xl:p-24 bg-gray-100 transition-all overflow-hidden'>
            <section className="bg-white w-full h-auto px-4 py-2 lg:px-6 lg:py-6 xl:px-8 xl:py-10 flex flex-col lg:flex-row rounded-2xl gap-5 lg:gap-10 xl:gap-14">
                <nav className="w-full lg:w-2/5">
                    <div className="w-full mb-4 mt-2 flex flex-col p-4 lg:p-7 rounded-2xl bg-gray-100">
                        <div className="w-full flex justify-between items-center">
                            <span className="font-semibold text-xs lg:text-sm">Validity 12 months</span>
                            <span className="bg-pinky text-white text-[10px] lg:text-xs px-4 py-1 rounded-[4px]">Online</span>
                        </div>
                        <div className="relative bg-pinky w-full h-[60vw] lg:h-[18vw] mt-2 lg:mt-4 flex justify-center items-center rounded-2xl">
                            <svg className="w-1/5" xmlns="http://www.w3.org/2000/svg" width="155" height="135" viewBox="0 0 155 135" fill="none">
                                <path d="M85.9267 80.9723V84.5116C85.9267 109.04 72.4516 119.581 52.0676 119.581C31.6836 119.581 18.0189 109.04 18.0189 84.5116V0.00195312H0V84.322C0 118.996 23.3544 134.913 51.878 134.913C80.3817 134.913 103.946 118.996 103.946 84.322V80.9723H85.9267Z" fill="#FFFF" />
                                <path d="M140.654 46.6699H84.0057V64.4227H140.654V46.6699Z" fill="#FFFF" />
                                <path d="M155 0H84.0057V17.7528H155V0Z" fill="#FFFF" />
                            </svg>
                            <span className="absolute right-[6%] bottom-[4%] text-white font_copper text-xs lg:text-sm">URBAN FITS</span>
                        </div>
                    </div>
                    <Accordian title="About this gift card" className="p-4 lg:p-6 outline-none accordion-section rounded-xl bg-gray-100 mb-6">
                        <p className="mt-4"> URBAN FITS is the world's leading designer, marketer and
                            distributor of authentic apparel, equipment and accessories for
                            a wide variety of sports and fitness activities. <br /><br />
                            Have a friend or loved one who is passionate about sports? Get
                            them exactly what they would need or want to enjoy their
                            favourite activity, in apparel and equipment designed
                            specifically for athletes to stay comfortable and improve at
                            their game. Get them the URBAN FITS eGift card, the gift that is
                            always a perfect fit! You could send this eGift card to loved
                            ones, friends or colleagues on their Birthdays, Anniversaries, or
                            on Eid, Christmas, Diwali and other festivals celebrated
                            throughout the year. It is also a great option when you want to
                            send someone a gift to show your appreciation for a “Job Well
                            Done” or to say “Thank You”, or just as a kind thought to
                            motivate them to keep working on their goals, and look great
                            while they are at it! <br /> <br />
                            You can even send it instantly or schedule a perfect time in
                            advance. Your loved one will receive their URBAN FITS Gift Card
                            conveniently on their email, with an exciting digital unwrapping
                            experience. This is gifting made easy, fun, convenient and safe!</p>
                    </Accordian>

                    <Accordian title="Terms & Conditions" className="p-4 lg:p-6 outline-none accordion-section rounded-xl bg-gray-100 mb-6">
                        <ul className='mt-4 space-y-2'>
                            <li>• This eGift Card cannot be exchanged for cash</li>
                            <li>• This eGift Card is Valid for one year (12 Months) from the date of issue</li>
                            <li>• This eGift Card is only valid for online shopping on urbanfits.ae</li>
                            <li>• This eGift Card is for one-time use only. Partial Redemptions are not applicable.This eGift Card needs to be used fully for the face value of the eGift Card or higher</li>
                            <li>• This eGift Card is redeemable even during promotions and sales</li>
                            <li>• This eGift Card is not replaceable if lost or stolen</li>
                            <li>• Expired eGift Cards cannot be extended, exchanged or refunded</li>
                            <li>• For all Customer related queries and feedback please call (971) 52 7174508 or email - support@urbanfits.ae</li>
                        </ul>
                    </Accordian>
                </nav>
                <nav className="w-full lg:w-3/5 p-4 lg:p-6 overflow-x-hidden overflow-y-visible">
                    {giftcardConflictWarning && <div className="relative w-full p-4 text-[10px] lg:text-xs text-red-600 bg-red-100 border border-red-600 rounded-lg">
                        <button onClick={() => setGiftcardConflictWarning(false)} className="fa fa-xmark absolute top-1 right-1 text-sm text-red-600" />
                        You cannot checkout or add the gift card to cart along with other product items due to the system policy.
                        You can only make a gift card purchase individually with online payment since it's an E-Giftcard.
                        Click here to remove existing cart items. <button onClick={() => { emptyCart(); setGiftcardConflictWarning(false) }} className="px-2 py-0.5 rounded-2xl text-[8px] lg:text-[10px] text-white bg-red-500">Remove Items</button>
                    </div>}
                    <div className="w-full flex justify-between items-center">
                        <h2 className="font_copper text-base lg:text-xl text-black">URBAN FITS</h2>
                        <span className="text-base lg:text-xl font-bold">{values.price} AED</span>
                    </div>
                    <section className={`w-[300%] flex gap-x-4 md:gap-x-6 ${translate == 2 ? "-translate-x-1/3" : translate == 3 ? "-translate-x-[66.66%]" : ''} transition-all duration-500`}>
                        <div style={{ opacity: translate !== 1 ? 0 : 1 }} className="w-1/3 flex flex-col transition-all">
                            <div className="w-full mt-5 lg:mt-10 flex justify-between items-center gap-x-4">
                                <button onClick={() => setFieldValue("buy_for", "friend")} className={`w-1/2 py-3 lg:py-5 ${values.buy_for === "friend" ? "bg-white border-pinky shadow-lg" : "bg-gray-100 border-transparent"} hover:bg-white border hover:border-pinky rounded-md font-semibold lg:rounded-lg text-sm lg:text-base transition-all`}>{giftCardMethods.friend.title}</button>
                                <button onClick={() => setFieldValue("buy_for", "self")} className={`w-1/2 py-3 lg:py-5 ${values.buy_for === "self" ? "bg-white border-pinky shadow-lg" : "bg-gray-100 border-transparent"} hover:bg-white border hover:border-pinky rounded-md font-semibold lg:rounded-lg text-sm lg:text-base transition-all`}>{giftCardMethods.self.title}</button>
                            </div>
                            <div className="w-full mt-4 lg:mt-8 flex flex-wrap justify-between gap-2 ">
                                {giftCardPrices.map(price => <PriceBtn price={price} giftPrice={values.price} setGiftPrice={() => setFieldValue("price", price)} />)}
                            </div>
                            <span className="my-4 text-sm lg:text-base">Quantity:</span>
                            <div className="w-full flex gap-x-3">
                                <div className="w-1/3 lg:w-1/5 flex justify-between items-center border rounded-lg">
                                    <button onClick={() => setFieldValue("quantity", values.quantity > 1 ? values.quantity - 1 : values.quantity)} className="w-1/3 py-3 text-center hover:bg-gray-100">-</button>
                                    <span className="w-1/3 py-3 text-center">{values.quantity}</span>
                                    <button onClick={() => setFieldValue("quantity", values.quantity < 5 ? values.quantity + 1 : values.quantity)} className="w-1/3 py-3 text-center hover:bg-gray-100">+</button>
                                </div>
                                {values.buy_for == "self" ? <div className="flex-1 flex gap-x-4">
                                    <button type='button' onClick={() => handleSubmit()} disabled={isError} className={`${isError && "opacity-60 pointer-events-none"} w-1/2 py-3 text-center font-semibold text-black text-xs lg:text-sm bg-gray-100 text-semibold rounded-lg`}>Add to Cart</button>
                                    <button type='button' onClick={checkOut} disabled={isError} className={`${isError && "opacity-60 pointer-events-none"} w-1/2 py-3 text-center font-semibold text-white text-xs lg:text-sm text-semibold bg-pinky rounded-lg`}>Check Out</button>
                                </div> : <button onClick={() => setTranslate(2)} className="flex-1 py-3 text-center text-white text-semibold bg-pinky rounded-lg">Continue</button>}
                            </div>
                        </div>
                        <div style={{ opacity: translate !== 2 ? 0 : 1 }} className="w-1/3 flex flex-col gap-4 transition-all overflow-hidden">
                            <div className="flex items-center gap-x-2 lg:gap-x-4">
                                <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl"></i>
                                <div className="flex-1 flex flex-col">
                                    <span className="text-sm lg:text-base font-semibold">{giftCardMethods[values.buy_for].title}</span>
                                    <div className="w-full py-1 lg:py-2 flex justify-between items-center border-b border-dashed border-black">
                                        <span className="text-xs lg:text-sm font-semibold text-gray-400">AED {values.price}</span>
                                        <button onClick={() => setTranslate(1)} className="text-xs lg:text-sm">Change</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-3 lg:mt-5 flex items-center gap-x-2 lg:gap-x-4">
                                {errors?.cover ? <span className="size-6 border border-dashed border-black rounded-3xl" /> : <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl" />}
                                <div className="flex-1 flex justify-between items-center">
                                    <span className="text-sm lg:text-base font-semibold">Add Greeting Cover</span>
                                    <select name="card_type" onChange={(e) => setCoverType(e.target.value)} className="px-4 py-2 border border-pinky rounded-lg outline-none text-xs lg:text-sm focus:ring-2 ring-pink-300 transition-all">
                                        <option value="birthday_covers">Birthday</option>
                                        <option value="christmas_covers">Christmas</option>
                                    </select>
                                </div>
                            </div>
                            <section className="pl-8 lg:pl-10">
                                <div className="w-full flex gap-x-[3%]">
                                    {giftCardCovers[coverType].map((src, index) => <button onClick={() => setFieldValue("cover", src)} style={{ width: "23%", aspectRatio: "5/7" }} className={`group hover:scale-90 border hover:border-pinky ${values.cover === src ? "ring-2 ring-pinky" : "border-gray-200"} rounded-lg overflow-hidden transition-all duration-500 ease-[0.87, 0, 0.13, 1]`}>
                                        <Image key={index} width={232} height={348} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + src} className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-500 ease-[0.87, 0, 0.13, 1]' alt='birthday card 1' />
                                    </button>)}
                                </div>
                                <button onClick={() => setTranslate(3)} disabled={!values.cover} className={`${!values.cover && "opacity-60 pointer-events-none"} w-full mt-4 py-3 text-center text-white text-semibold bg-pinky rounded-lg`}>Continue</button>
                            </section>
                        </div>
                        <div style={{ opacity: translate !== 3 ? 0 : 1 }} className="w-1/3 mt-4 flex flex-col gap-4 lg:gap-7 transition-all">
                            <nav className="flex items-center gap-x-2 lg:gap-x-4">
                                <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl"></i>
                                <div className="flex-1 flex flex-col">
                                    <span className="text-xs md:text-sm lg:text-base font-semibold">{giftCardMethods[values.buy_for].title}</span>
                                    <div className="w-full py-1 lg:py-2 flex justify-between items-center border-b border-dashed border-black">
                                        <span className="text-[10px] md:text-xs lg:text-sm font-semibold text-gray-400">AED {values.price}</span>
                                        <button onClick={() => setTranslate(1)} className="text-[10px] md:text-xs lg:text-sm">Change</button>
                                    </div>
                                </div>
                            </nav>
                            <nav className="flex items-center gap-x-2 lg:gap-x-4">
                                <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl"></i>
                                <div className="flex-1 flex flex-col">
                                    <span className="text-xs md:text-sm lg:text-base font-semibold">{giftCardMethods[values.buy_for].title}</span>
                                    <div className="w-full py-1 lg:py-2 flex justify-between items-center border-b border-dashed border-black">
                                        <span className="text-[10px] md:text-xs lg:text-sm font-semibold text-gray-400">SELECTED</span>
                                        <button onClick={() => setTranslate(2)} className="text-[10px] md:text-xs lg:text-sm">Change</button>
                                    </div>
                                </div>
                            </nav>
                            <nav className="flex items-center gap-x-2 lg:gap-x-4">
                                {errors?.sender?.name ? <span className="size-6 border border-dashed border-black rounded-3xl" /> : <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl" />}
                                <div className="w-full py-1 lg:py-2 flex justify-between items-center gap-x-2 border-b border-dashed border-black">
                                    <span className="text-xs md:text-sm lg:text-base font-semibold">Sent By: </span>
                                    <input type="text" name='sender.name' onChange={handleChange} className="flex-1 outline-none border-none text-xs md:text-sm lg:text-base" value={values.sender.name} placeholder='Sender name' />
                                </div>
                            </nav>
                            <nav className="flex items-center gap-x-2 lg:gap-x-4">
                                {errors?.receiver?.name ? <span className="size-6 border border-dashed border-black rounded-3xl" /> : <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl" />}
                                <div className="w-full py-1 lg:py-2 flex justify-between items-center gap-x-2 border-b border-dashed border-black">
                                    <span className="text-xs md:text-sm lg:text-base font-semibold">Receiver Name: </span>
                                    <input type="text" name='receiver.name' onChange={handleChange} className="flex-1 outline-none border-none text-xs md:text-sm lg:text-base" value={values.receiver.name} placeholder='John Dow' />
                                </div>
                            </nav>
                            <nav className="flex items-center gap-x-2 lg:gap-x-4">
                                {errors?.receiver?.email ? <span className="size-6 border border-dashed border-black rounded-3xl" /> : <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl" />}
                                <div className="w-full py-1 lg:py-2 flex justify-between items-center gap-x-2 border-b border-dashed border-black">
                                    <span className="text-xs md:text-sm lg:text-base font-semibold">Receiver Email: </span>
                                    <input type="text" name='receiver.email' onChange={handleChange} className="flex-1 outline-none border-none text-xs md:text-sm lg:text-base" value={values.receiver.email} placeholder='john.doe@example.com' />
                                </div>
                            </nav>
                            <nav className="flex items-center gap-x-2 lg:gap-x-4">
                                {errors?.sender?.message ? <span className="size-6 border border-dashed border-black rounded-3xl" /> : <i className="fa-solid fa-circle-check text-xl md:text-2xl lg:text-2xl" />}
                                <div className="w-full py-1 lg:py-2 flex justify-between items-center gap-x-2 border-b border-dashed border-black">
                                    <span className="text-xs md:text-sm lg:text-base font-semibold">Your Message: </span>
                                    <input type="text" name='sender.message' onChange={handleChange} className="flex-1 outline-none border-none text-xs md:text-sm lg:text-base" value={values.sender.message} placeholder='Type your message here...' />
                                </div>
                            </nav>
                            <div className="w-full mt-4 flex gap-x-4">
                                <button onClick={() => handleSubmit()} disabled={isError} className={`${isError && "opacity-60 pointer-events-none"} w-1/2 py-3 text-center font-semibold text-black text-xs lg:text-sm bg-gray-100 text-semibold rounded-lg`}>Add to Cart</button>
                                <button onClick={checkOut} disabled={isError} className={`${isError && "opacity-60 pointer-events-none"} w-1/2 py-3 text-center font-semibold text-white text-xs lg:text-sm text-semibold bg-pinky rounded-lg`}>Check Out</button>
                            </div>
                        </div>
                    </section>
                </nav>
            </section>
        </main >
    </>
}