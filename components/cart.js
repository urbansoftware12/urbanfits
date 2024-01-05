import React, { useState, useEffect } from 'react'
import { useCart } from "react-use-cart";
import LinkBtn from '@/components/buttons/link_btn';
import Button from './buttons/simple_btn';
import MoreToExplore from './more_to_explore';
import useWallet from '@/hooks/useWallet';
// Image imports
import Image from 'next/image'
import EmptyCartVector from "../public/emptyCart.svg"
const CartBg = process.env.NEXT_PUBLIC_BASE_IMG_URL +  '/website-copyrights/cartbg.webp'
import Link from 'next/link';

// Cart item function
function CartItem(props) {
    const { product } = props
    const { formatPrice } = useWallet()
    const { updateItemQuantity, removeItem } = useCart()
    const [quantity, setQuantity] = useState(product.quantity)
    const [sizevalue, setSizevalue] = useState(product.size)

    const onSizeChange = (e) => {
        setQuantity(1)
        setSizevalue(e.target.value)
    }
    const getFilteredQuantity = () => {
        let selectedSizeObj = product.sizes.filter((obj) => {
            return obj.size == sizevalue
        })[0];
        return selectedSizeObj.quantity
    }
    const changeQuantity = (e, id) => {
        // updateItemQuantity(product.id, product.quantity)
        let name = e.target.getAttribute("name")
        if (name === "decrement" && quantity <= 1) return setQuantity(1)
        if (name === "increment" && quantity >= getFilteredQuantity()) return setQuantity(getFilteredQuantity())
        if (name === "decrement") {
            setQuantity(quantity - 1)
            updateItemQuantity(id, quantity - 1)
        }
        if (name === "increment") {
            setQuantity(quantity + 1)
            updateItemQuantity(id, quantity + 1)
        }
    }

    return <li {...props} className="relative group w-full h-[110px] my-10 text-[10px] lg:text-xs flex md:justify-between items-center">
        <div className="relative w-[100px] h-[110px] lg:w-[129px] lg:h-[140px] mr-5 flex justify-center items-center rounded-xl overflow-hidden">
            <Image width={129} height={160} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + product.images[0]} alt={product.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700" ></Image>
        </div>
        {/* to be displayed from md breakpoint */}
        <div className="hidden md:flex md:w-[85%] lg:py-3 md:p-0 h-full flex-row justify-between items-center font_urbanist_medium">
            <Link onClick={props.toggleCart} href={`/products/product/${product.product_id}?color=${product.color}`} className="w-[145px] font_urbanist_bold text-black transition-all duration-700">{product.name}</Link>
            <h3 className="w-[100px] font_urbanist_bold capitalize">{product?.color}</h3>
            {/* <Select /> */}
            <div className='relative'>
                <span className="select_container after:right-[20%]"></span>
                <select type="select" onChange={onSizeChange} value={sizevalue} className="select_element relative cursor-pointer w-24 h-11 rounded-md font_urbanist_bold tracking-widest text-xs px-5 border outline-none">
                    {product.sizes.map(obj => {
                        const { size } = obj
                        return <option disabled={obj.quantity < 1 ? true : false} value={size}>{size}</option>
                    })}
                </select>
            </div>
            <span className="w-24 h-11 px-5 rounded-md font_urbanist_light border flex justify-between items-center">
                <span onClick={(e) => { changeQuantity(e, product.id) }} name="decrement" className="text-lg cursor-pointer transition-all text-gray-300 select-none">-</span>
                <input type="number" readOnly className='w-3/5 h-auto font_urbanist text-center border-none outline-none pointer-events-none' value={quantity} />
                <span onClick={(e) => { changeQuantity(e, product.id) }} name="increment" className="text-lg cursor-pointer transition-all text-gray-300 select-none">+</span>
            </span>
            <h3 className="font_urbanist_bold self-center text-xs">{formatPrice(product.price * quantity)}</h3>
            <button onClick={() => { removeItem(product.id) }} className="hidden md:block fa-solid fa-xmark font_urbanist_medium text-xs tracking-widest"></button>
        </div>
        {/* to be displayed in mobile */}
        <div className="md:hidden h-full ml-2 flex flex-col justify-between items-start font_urbanist_medium tracking-widest">
            <Link onClick={props.toggleCart} href={`/products/product/${product.product_id}?color=${product.color}`} className="w-full flex justify-between font_urbanist_bold text-sm text-black transition-all duration-700">{product.name} <button onClick={() => { removeItem(product.id) }} className="fa-solid fa-xmark text-gray-200" /></Link>
            <h3 className="font_urbanist_medium self-start text-xs">{formatPrice(product.price * quantity)}</h3>
            <div className="w-full flex self-end gap-3">
                <div className='relative'>
                    <span className="select_container after:right-[20%]"></span>
                    <select type="select" defaultValue={product.size} className="select_element relative cursor-pointer w-[100px] h-[30px] rounded-md font_urbanist_medium tracking-widest text-[10px] px-5 border outline-none">
                        {product.sizes.map(obj => {
                            const { size } = obj
                            return <option value={size}>{size}</option>
                        })}
                    </select>
                </div>
                <span className="w-[100px] h-[30px] px-5 rounded-md font_urbanist_light border flex justify-between items-center">
                    <span onClick={(e) => { changeQuantity(e, product.id) }} name="decrement" className="text-lg cursor-pointer transition-all text-gray-300 select-none">-</span>
                    <input type="number" readOnly className='w-2/5 h-auto font_urbanist text-center border-none outline-none pointer-events-none' value={quantity} />
                    <span onClick={(e) => { changeQuantity(e, product.id) }} name="increment" className="text-lg cursor-pointer transition-all text-gray-300 select-none">+</span>
                </span>
            </div>
        </div>
    </li>
}

export default function Cart(props) {
    const { isEmpty, items, cartTotal, removeItem, emptyCart } = useCart()
    const [shippingRates, setShippingRates] = useState(null)
    const { formatPrice, getShippingRates } = useWallet()

    useEffect(() => {
        getShippingRates((data) => setShippingRates(data))
    }, [])

    const calculateTotolShippingFee = (fees) => {
        const filteredItems = items.filter(item => !item.id.startsWith("giftcard_"))
        if(!filteredItems.length) return 0
        const totalWeight = filteredItems.reduce((accValue, item) => { return accValue + (item.weight * item.quantity) }, 0)
        if (totalWeight <= 5100) return fees
        const additionalWeight = totalWeight - 5100
        const additionalCharges = (additionalWeight / 1000) * (shippingRates?.additionalKgCharges || 1)
        return fees + additionalCharges
    }

    return <section className={`bg-white w-full fixed ${props.top_0 ? 'h-screen top-0' : 'h-screen lg_layout_height top-0 md:top-[115px]'} right-0 z-[60] md:z-30 transition-all duration-700 overflow-x-hidden overflow-y-scroll ${props.cart ? null : "-translate-y-[130%] opacity-0"} font_urbanist`}>
        <div className="w-full flex justify-center">
            {isEmpty ?
                <section className="w-full layout_height flex flex-col justify-center items-center space-y-4" >
                    <Image width={200} height={200} src={EmptyCartVector} alt="Urban images" className="w-1/2 md:w-auto" />
                    <h4 className="text-3xl text-center">Your Cart Is Empty</h4>
                    <p className="w-11/12 md:w-1/2 lg:w-1/3 text-center font_gotam_light">Looks like you have not added anything to your cart. Go ahead & explore top categories.</p>
                    <Button onClick={props.toggleCart} classes="w-1/2 md:w-1/4 lg:w-64" >Back to Shope</Button>
                </section>
                :
                <section className='w-full h-full pt-0 lg:p-10 lg:pb-14 lg:pt-0 text-left' >
                    <div className="relative w-full h-[20vh] lg_layout_height mb-5 md:mb-7 lg:mb-10 overflow-hidden">
                        <Image width={1600} height={1000} src={CartBg} className='h-full lg:w-full lg:h-auto object-cover object-center' />
                        <h1 className="w-full text-center absolute top-1/2 -translate-y-1/2 font_copper text-white text-2xl md:text-[32px] tracking-[0.15em] lg:tracking-expand my-10">SHOPPING CART</h1>
                    </div>
                    <div className="w-full px-4 lg:px-14 flex flex-col lg:justify-between">
                        <div className="w-full mb-3">
                            {/* <span className="w-full flex justify-between border-b border-b-gray-300 mb-5"> <h5>Shopping Bag ({totalUniqueItems})</h5> <button onClick={props.toggleCart}><i className="fa-solid fa-arrow-left mr-2"></i>Back</button> </span> */}
                            <div className="hidden lg:flex justify-between w-full mt-7 mb-3 font_urbanist_medium tracking-widest text-xs">
                                <span className="md:w-[35vw] lg:w-[18vw] 2xl:w-[18vw] text-gray-300">PRODUCT</span>
                                <span className='text-gray-300 translate-x-2'>COLOR</span>
                                <span className='text-gray-300'>SIZE</span>
                                <span className='text-gray-300'>UNITS</span>
                                <span className='w-[10%] text-gray-300'>AMOUNT</span>
                            </div>
                            {items.map((product, index) => {
                                if (product.id.startsWith("giftcard_")) return <li key={index} className="relative group w-full h-[110px] my-10 text-[10px] lg:text-xs flex md:justify-between items-center">
                                    <div className={`${product.bg} w-[100px] h-20 lg:w-[129px] lg:h-20 mr-5 flex justify-center items-center rounded-xl font_montserrat_bold text-xs text-white uppercase tracking-1 overflow-hidden`}>{product.d_name}</div>
                                    {/* to be displayed from md breakpoint */}
                                    <div className="hidden md:flex md:w-[85%] lg:py-3 md:p-0 h-full flex-row justify-between items-center font_urbanist_medium">
                                        <Link onClick={props.toggleCart} href="/giftcards" className="w-[145px] font_urbanist_bold text-black transition-all duration-700">{product.name}</Link>
                                        <h3 className="font_urbanist_bold self-center text-xs">{formatPrice(product.price)}</h3>
                                        <button onClick={() => { removeItem(product.id) }} className="hidden md:block fa-solid fa-xmark font_urbanist_medium text-xs tracking-widest"></button>
                                    </div>
                                    {/* to be displayed in mobile */}
                                    <div className="md:hidden h-full ml-2 flex flex-col justify-between items-start font_urbanist_medium tracking-widest">
                                        <Link onClick={props.toggleCart} href="/giftcards" className="w-full flex justify-between font_urbanist_bold text-sm text-black transition-all duration-700">{product.name} <button onClick={() => { removeItem(product.id) }} className="fa-solid fa-xmark text-gray-200" /></Link>
                                        <h3 className="font_urbanist_medium self-start text-xs">{formatPrice(product.price)}</h3>
                                    </div>
                                </li>
                                return <CartItem key={product.id} toggleCart={props.toggleCart} product={product} />
                            })}
                            <button onClick={emptyCart} className="text-xs md:text-sm">Delete All <i className="fa-solid fa-xmark ml-10" /> </button>
                        </div>
                        <div className="w-full lg:w-[400px] self-center lg:self-end">
                            <h3 className="text-center text-sm lg:text-[17px] font_urbanist_bold mb-5">Order Summary</h3>
                            <div className="w-full h-auto p-4 rounded-2xl font_urbanist_bold bg-white items-center border">
                                <span className="w-full my-3 mx-auto flex justify-between"><span className='font_urbanist_medium text-gray-400'>Subtotal</span> <span>{formatPrice(cartTotal)}</span></span>
                                <span className="w-full my-3 mx-auto flex justify-between"><span className='font_urbanist_medium text-gray-400'>Shipping Fee</span> <span>{formatPrice(calculateTotolShippingFee(shippingRates?.price || 0))}</span></span>
                                <br />
                                <span className="w-full my-3 mx-auto flex justify-between"><span className='text-gray-400'>Total</span> <span>{formatPrice(cartTotal + calculateTotolShippingFee(shippingRates?.price || 0))}</span></span>
                            </div>
                            <LinkBtn href="/checkout/step1" onClick={props.toggleCart} font='font_urbanist_bold' classes="w-full">Check Out</LinkBtn>
                        </div>
                    </div>
                    <div className="w-full px-4 lg:px-14 mb-20">
                        <MoreToExplore categoryId={items[0]? items[0]?.category_id : "64a59d5816b4c91fa1967b2e"} />
                    </div>
                </section>}
        </div>
    </section>
}
