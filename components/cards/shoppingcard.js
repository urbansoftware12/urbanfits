import { useState, useRef } from 'react'
import Link from 'next/link'
import AddToShopListModal from '../modals/addtoshoppinglist';
import { useCart } from "react-use-cart";
import useUser from '@/hooks/useUser';
import Image from 'next/image'
import heart from '@/public/heart.svg'
import redHeart from '@/public/redHeart.svg'
import toaster from '@/utils/toast_function'
import ImgLoader from '../loaders/imgLoader';
import DemoImg from '@/public/card imgs/demo-img.png'
import useWallet from '@/hooks/useWallet';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
const { formatPrice } = useWallet.getState()
// const ImgDataUri = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAGAAoDASEAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABwj/xAAiEAABAwMDBQAAAAAAAAAAAAABAgMRAAQFBgcSEyEiMUL/xAAVAQEBAAAAAAAAAAAAAAAAAAAFB//EACERAAEEAQMFAAAAAAAAAAAAAAECAwQRAAUhMVFhcYGR/9oADAMBAAIRAxEAPwCNtrNMYjMbN6hyd4hAurVm9eaIYCuoW2QvyVyBTEyIBk++1CS3ZWowkST8CrLMS0YMdSU7kG734r5j2uOuITGbUAAGkEUOQeve7v14z//Z"

export default function Shoppingcard({ product }, props) {
    const { addItem, inCart } = useCart()
    const { user, wishList, addToWishList, removeFromWishList, inWishList } = useUser()
    const [addToListModal, setAddToListModal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeVariant, setActiveVariant] = useState(product?.variants ? product?.variants[0] : null)
    const splideRef = useRef(null)

    const addToCart = () => {
        if (inCart(`${activeVariant._id}${activeVariant.sizes[0].size}`)) return toaster('info', 'This item is already in the cart!');
        addItem({
            product_id: product._id,
            variant_id: activeVariant._id,
            id: `${activeVariant._id}${activeVariant.sizes[0].size}`,
            name: product.name,
            price: product.sale_price || product.price,
            sale_price: product.sale_price || 0,
            uf_points: product.uf_points || 0,
            weight: product.shipping_details.weight,
            stock: activeVariant.stock,
            size: activeVariant.sizes[0].size,
            sizes: activeVariant.sizes,
            color: activeVariant.color_name,
            images: activeVariant.images,
            categories: product.categories
        }, 1); toaster('success', "Your item is added to the Cart")
    }
    const addToWishlist = () => {
        if (inWishList(product._id)) {
            removeFromWishList(product._id)
            return toaster("info", 'Product removed from WishList.')
        }
        else {
            if (wishList.length > 79) return toaster("info", "You've reached your maximum limit.")
            addToWishList(product._id)
            return toaster("success", 'Product added to WishList.')
        }
    }

    return <>
        {addToListModal}
        <div {...props} className={`group relative ${props.classes ? props.classes : "w-full min-h-[330px] mid:h-[380px] lg:h-[360px] xl:h-[405px] 2xl:h-[420px]"} ${props.margin ? props.margin : 'mr-auto my-3 md:my-4'} transition-all duration-500 overflow-hidden`} >
            {product.sale_price ? <span className="w-7 lg:w-10 aspect-square absolute top-2 left-2 md:top-3 md:right-4 z-10 transition-all duration-300 rounded-full flex justify-center items-center text-white text-[8px] lg:text-xs bg-[#FF4A60] hover:shadow-xl">-{(100 - (product.sale_price / product.price * 100)).toFixed(0)}%</span> : null}
            <button onClick={addToWishlist} title='Add to Wishlist' className="group lg:opacity-0 lg:translate-x-full lg:pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto w-7 lg:w-10 aspect-square absolute top-2 right-2 md:top-3 md:right-4 z-10 transition-all duration-300 rounded-full lg:rounded-none flex justify-center items-center bg-white hover:shadow-xl">
                <Image src={inWishList(product._id) ? redHeart : heart} className='w-3 md:w-4' alt='wishlist' />
            </button>
            {user?._id && <button onClick={() => setAddToListModal(<AddToShopListModal product_id={product._id} show={addToListModal} setAddToListModal={setAddToListModal} />)} title="Add to Shopping List" className="group lg:opacity-0 lg:translate-x-full lg:pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto w-7 lg:w-10 aspect-square absolute top-11 right-2 md:top-11 md:right-4 z-10 transition-all duration-300 rounded-full lg:rounded-none flex justify-center items-center bg-transparent bg-white hover:shadow-xl delay-75">
                <svg className='w-3 md:w-4 aspect-square' width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.21942 1.68268C1.96529 1.68268 1.96529 2.24417 1.96529 2.93681V15.4781C1.96529 17.556 2.34375 19.1621 5.72768 19.2405H18.269C21.3438 19.1621 22.0313 17.556 22.0313 15.4781V9.20741C22.0313 7.12951 21.3438 4.44511 18.269 4.44511H13.3407C12.0827 4.44511 10.7442 4.44511 10.2102 3.76968L9.19123 2.24114C8.95863 1.89224 8.56703 1.68268 8.14773 1.68268H3.21942ZM0.457031 2.93681C0.457031 0.858887 1.14151 0.174417 3.21942 0.174417H8.14773C9.40563 0.174417 9.64595 0.115998 10.3438 1.1627C11.0415 2.2094 11.3438 2.6627 11.3438 2.6627C11.5764 3.0116 12.9214 2.93681 13.3407 2.93681H18.269C21.7321 2.93681 23.5396 5.74431 23.5396 9.20741V15.4781C23.5396 18.9413 21.7321 20.7487 18.269 20.7487H5.72768C2.26449 20.7487 0.457031 18.9413 0.457031 15.4781V2.93681ZM12 8C12.6926 8 12.667 8.66211 12.667 9.20741V11.4004H14.957C15.6497 11.4004 16.457 11.3073 16.457 12C16.457 12.6926 15.6497 12.5969 14.957 12.5969H12.667V15.4784C12.667 15.6113 12.6926 16.5 12 16.5C11.3074 16.5 11.2693 15.7985 11.2693 15.4784V12.5969H8.86303C8.17033 12.5969 7.34375 12.6985 7.34375 12.0059C7.34375 11.3132 8.17033 11.4004 8.86303 11.4004H11.2693V9.20741C11.2693 8.51481 11.3074 8 12 8Z" fill="black" />
                </svg>
            </button>}
            <div className='w-full h-full'>
                <Link href={props.link || `/products/product/${product._id}?color=${activeVariant?.color_name}`} className="relative w-full h-[70%] xl:h-[72%] flex justify-center items-start overflow-clip">
                    <Splide className='w-full h-full group-hover:scale-105 transition-all duration-1000' ref={splideRef} options={{
                        type: 'fade',
                        speed: 1200,
                        width: "100%",
                        fixedWidth: "100%",
                        height: "100%",
                        fixedHeight: "100%",
                        pagination: false,
                        arrows: false
                    }} >
                        {product?.variants?.map((variant) => {
                            return <SplideSlide>
                                <ImgLoader loading={loading} classes="w-full py-20" />
                                <Image className={loading ? 'w-0 h-0' : ''} onLoad={() => setLoading(false)} width={650} height={860} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + variant?.images[0] || DemoImg} alt="Urban images" />
                            </SplideSlide>
                        })}
                    </Splide>
                </Link>
                <div className="w-full h-[30%] md:h-1/5 text-black flex flex-col">
                    <Link href={props.link || `/products/product/${product._id}?color=${activeVariant?.color_name}`} className="w-full xl:mt-2 2xl:mt-4 font_urbanist_medium text-sm lg:text-base">
                        <p className="truncate">{product.name}</p>
                    </Link>
                    <div className="w-full flex flex-col lg:flex-row lg:items-center">
                        <span className="w-3/5 mb-1 lg:mb-0 font_urbanist_medium text-gray-300 text-xs lg:text-sm">
                            <p className='truncate capitalize'>{product?.categories?.map(category => <Link href={`/products/category/${category._id}?name=${category.name}`}>{category.name},&nbsp;</Link>)}</p>
                        </span>
                        <span className="flex-1 flex items-center lg:justify-end gap-x-1.5">{product.variants?.map((variant, index) => <button key={index}
                            onClick={() => { splideRef.current.splide.go(index); setActiveVariant(variant) }} style={{ background: variant.color }} className={`w-3 lg:w-4 aspect-square rounded-full border-[0.5px]`} />)}
                        </span>
                    </div>
                    <div className='w-full mt-1 md:mt-2 flex justify-between items-center font_urbanist text-[10px] lg:text-sm '>
                        <div className="group lg:h-5 flex flex-col overflow-clip">
                            {product.sale_price ? <div className="lg:group-hover:-translate-y-full flex items-start transition-all duration-300">
                                <span className="text-gray-400 text-[8px] lg:text-10px line-through">{formatPrice(product.price)}&nbsp;</span>
                                <span className='text-[#FF4A60] font_urbanist_bold'>{formatPrice(product.sale_price)}</span>
                            </div>
                                : <span className='lg:group-hover:-translate-y-full text-[#FF4A60] font_urbanist_bold transition-all duration-300'>{formatPrice(product.price)}</span>}
                            <div className="w-full hidden lg:flex">
                                {inCart(`${activeVariant._id}${activeVariant.sizes[0].size}`) ? <span className="group-hover:-translate-y-full text-pinky transition-all duration-300 cursor-default">Added <i className="fa-solid fa-check" /></span> : <button onClick={addToCart} className='group-hover:-translate-y-full flex flex-col font_urbanist_medium leading-[1] transition-all duration-300'>
                                    + Add to cart
                                </button>}
                            </div>
                        </div>
                        {product.uf_points ? <span className='text-pinky font_urbanist_medium'>Earn {product.uf_points}pts</span> : null}
                    </div>
                    <div className="w-full lg:hidden">{inCart(`${activeVariant._id}${activeVariant.sizes[0].size}`) ? <span className="text-pinky text-left font_urbanist_medium text-10px">Added <i className="fa-solid fa-check" /></span> : <button onClick={addToCart} className="w-full text-left font_urbanist_medium text-10px">+ Add to cart</button>}</div>
                </div>
            </div>
        </div>
    </>
}

export function SmallShoppingcard({ product }, props) {
    const { addItem, inCart } = useCart()
    const { user, wishList, addToWishList, removeFromWishList, inWishList } = useUser()
    const [addToListModal, setAddToListModal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeVariant, setActiveVariant] = useState(product?.variants[0])
    const splideRef = useRef(null)

    const addToCart = () => {
        if (inCart(`${activeVariant._id}${activeVariant.sizes[0].size}`)) return toaster('info', 'This item is already in the cart!');
        addItem({
            product_id: product._id,
            variant_id: activeVariant._id,
            id: `${activeVariant._id}${activeVariant.sizes[0].size}`,
            category_id: product.categories[0],
            name: product.name,
            price: product.price,
            uf_points: product.sale_price || product.uf_points,
            weight: product.shipping_details.weight,
            stock: activeVariant.stock,
            size: activeVariant.sizes[0].size,
            sizes: activeVariant.sizes,
            color: activeVariant.color_name,
            images: activeVariant.images
        }, 1); toaster('success', "Your item is added to the Cart")
    }
    const addToWishlist = () => {
        if (inWishList(product._id)) {
            removeFromWishList(product._id)
            return toaster("info", 'Product removed from WishList.')
        }
        else {
            if (wishList.length > 79) return toaster("info", "You've reached your maximum limit.")
            addToWishList(product._id)
            return toaster("success", 'Product added to WishList.')
        }
    }

    return <>
        {addToListModal}
        <div {...props} className={`group relative ${props.classes ? props.classes : "w-full min-h-[170px] h-[270px]"} ${props.margin ? props.margin : 'mr-auto my-2'} overflow-hidden`} >
            {product.sale_price ? <span className="w-7 lg:w-10 aspect-square absolute top-2 left-2 md:top-3 md:right-4 z-10 transition-all duration-300 rounded-full flex justify-center items-center text-white text-[8px] lg:text-xs bg-[#FF4A60] hover:shadow-xl">-{(100 - (product.sale_price / product.price * 100)).toFixed(0)}%</span> : null}
            <button onClick={addToWishlist} title='Add to Wishlist' className="group lg:opacity-0 lg:translate-x-full lg:pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto w-7 lg:w-10 aspect-square absolute top-2 right-2 md:top-3 md:right-4 z-10 transition-all duration-300 rounded-full lg:rounded-none flex justify-center items-center bg-white hover:shadow-xl">
                <Image src={inWishList(product._id) ? redHeart : heart} className='w-3 md:w-4' alt='wishlist' />
            </button>
            {user?._id && <button onClick={() => setAddToListModal(<AddToShopListModal product_id={product._id} show={addToListModal} setAddToListModal={setAddToListModal} />)} title="Add to Shopping List" className="group lg:opacity-0 lg:translate-x-full lg:pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto w-7 lg:w-10 aspect-square absolute top-11 right-2 md:top-11 md:right-4 z-10 transition-all duration-300 rounded-full lg:rounded-none flex justify-center items-center bg-transparent bg-white hover:shadow-xl delay-75">
                <svg className='w-3 md:w-4 aspect-square' width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.21942 1.68268C1.96529 1.68268 1.96529 2.24417 1.96529 2.93681V15.4781C1.96529 17.556 2.34375 19.1621 5.72768 19.2405H18.269C21.3438 19.1621 22.0313 17.556 22.0313 15.4781V9.20741C22.0313 7.12951 21.3438 4.44511 18.269 4.44511H13.3407C12.0827 4.44511 10.7442 4.44511 10.2102 3.76968L9.19123 2.24114C8.95863 1.89224 8.56703 1.68268 8.14773 1.68268H3.21942ZM0.457031 2.93681C0.457031 0.858887 1.14151 0.174417 3.21942 0.174417H8.14773C9.40563 0.174417 9.64595 0.115998 10.3438 1.1627C11.0415 2.2094 11.3438 2.6627 11.3438 2.6627C11.5764 3.0116 12.9214 2.93681 13.3407 2.93681H18.269C21.7321 2.93681 23.5396 5.74431 23.5396 9.20741V15.4781C23.5396 18.9413 21.7321 20.7487 18.269 20.7487H5.72768C2.26449 20.7487 0.457031 18.9413 0.457031 15.4781V2.93681ZM12 8C12.6926 8 12.667 8.66211 12.667 9.20741V11.4004H14.957C15.6497 11.4004 16.457 11.3073 16.457 12C16.457 12.6926 15.6497 12.5969 14.957 12.5969H12.667V15.4784C12.667 15.6113 12.6926 16.5 12 16.5C11.3074 16.5 11.2693 15.7985 11.2693 15.4784V12.5969H8.86303C8.17033 12.5969 7.34375 12.6985 7.34375 12.0059C7.34375 11.3132 8.17033 11.4004 8.86303 11.4004H11.2693V9.20741C11.2693 8.51481 11.3074 8 12 8Z" fill="black" />
                </svg>
            </button>}
            <div className='w-full h-full'>
                <Link href={props.link || `/products/product/${product._id}?color=${activeVariant.color_name}`} className="relative w-full h-[70%] lg:h-[70%] xl:h-[72%] flex justify-center items-center overflow-clip">
                    <ImgLoader loading={loading} />
                    <Splide className='w-full h-full group-hover:scale-105 transition-all duration-1000' ref={splideRef} options={{
                        type: "fade",
                        width: "100%",
                        fixedWidth: "100%",
                        height: "100%",
                        fixedHeight: "100%",
                        speed: 1500,
                        pagination: false,
                        arrows: false
                    }} >
                        {product.variants.map((variant) => {
                            return <SplideSlide>
                                <ImgLoader loading={loading} />
                                <Image className={loading ? 'w-0 h-0' : ''} onLoad={() => setLoading(false)} priority={true} width={650} height={860} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + variant?.images[0] || DemoImg} alt="Urban images" />
                            </SplideSlide>
                        })}
                    </Splide>
                </Link>
                <div className="w-full h-1/5 pt-1 text-black flex flex-col">
                    <Link href={props.link || `/products/product/${product._id}?color=${activeVariant.color_name}`} className="w-full font_urbanist_medium text-xs">
                        <p className="truncate">{product.name}</p>
                    </Link>
                    <div className="w-full mt-1 flex items-center">
                        {product.uf_points ? <span className='w-1/2 text-pinky text-10px font_urbanist_medium'>Earn {product.uf_points}pts</span> : null}
                        <span className="flex-1 flex items-center lg:justify-end gap-x-1.5">{product.variants?.map((variant, index) => <button key={index}
                            onClick={() => { splideRef.current.splide.go(index); setActiveVariant(variant) }} style={{ background: variant.color }} className={`w-3 lg:w-4 aspect-square rounded-full border-[0.5px]`} />)}
                        </span>
                    </div>
                    <div className='w-full my-1 flex justify-between items-center font_urbanist text-[10px] lg:text-sm '>
                        <div className="group lg:h-5 flex flex-col overflow-clip">
                            {product.sale_price ? <div className="lg:group-hover:-translate-y-full flex items-start transition-all duration-300">
                                <span className="text-gray-400 text-[8px] line-through">{formatPrice(product.price)}&nbsp;</span>
                                <span className='text-[#FF4A60] text-xs font_urbanist_bold'>{formatPrice(product.sale_price)}</span>
                            </div>
                                : <span className='lg:group-hover:-translate-y-full text-[#FF4A60] font_urbanist_bold transition-all duration-300'>{formatPrice(product.price)}</span>}
                            <div className="w-full hidden lg:flex">
                                {inCart(`${activeVariant._id}${activeVariant.sizes[0].size}`) ? <span className="group-hover:-translate-y-full text-pinky text-xs transition-all duration-300 cursor-default">Added <i className="fa-solid fa-check" /></span> : <button onClick={addToCart} className='group-hover:-translate-y-full flex flex-col font_urbanist_medium leading-[1] transition-all duration-300'>
                                    + Add to cart
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
