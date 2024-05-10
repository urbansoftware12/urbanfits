import { useEffect, useState } from 'react'
import { useCart } from "react-use-cart";
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import useWallet from '@/hooks/useWallet';
import useLanguage from '@/hooks/useLanguage';
import { productPage as productLang } from '@/locales';
import useProduct from '@/hooks/useProduct';
import BounceLoader from '@/components/loaders/bounceLoader';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Head from 'next/head';
import Shoppingcard, { SmallShoppingcard } from '@/components/cards/shoppingcard';
const ProductCarousel = dynamic(() => import('@/components/carousels/productCarousel'));
import toaster from '@/utils/toast_function';
import Button from '@/components/buttons/simple_btn';
import Link from 'next/link';
import addToCartToast from '@/components/taosts/add-to-cart';
// Share buttons imports
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, PinterestShareButton } from 'react-share'

export default function Product(props) {
    const productData = { ...props.resProduct, id: props.resProduct._id }
    const router = useRouter();
    const { formatPrice } = useWallet();
    const { setRecentItems } = useUser();
    // const { wishList } = useUser();
    const { locale } = useLanguage();
    const [product, setProduct] = useState(productData.variants[0])
    const [sizevalue, setSizevalue] = useState(product.sizes[0].size)
    const [quantity, setQuantity] = useState(1)
    const [similarProducts, setSimilarProducts] = useState([])
    const { getSimilarProducts, productLoading } = useProduct()
    const langObj = productLang[locale];

    useEffect(() => {
        const { color } = router.query
        if (!color) return
        let newProduct = productData.variants.filter((variant) => {
            return variant.color_name === color
        })
        if (!newProduct[0]) return () => { router.push('/404') }
        setProduct(newProduct[0])
        setSizevalue(newProduct[0].sizes[0].size)
    }, [router.query.color])

    useEffect(() => {
        getSimilarProducts(productData.id, (arg) => setSimilarProducts(arg))
        setRecentItems({
            id: product._id,
            href: router.asPath,
            image: product.images[0],
            name: productData.name
        })
    }, [])

    // size value channge funciton
    const onSizeChange = (e) => {
        setQuantity(1)
        setSizevalue(e.target.name)
    }
    const onColorChange = (e) => {
        setQuantity(1)
        router.push(`/products/product/${productData.id}?color=${e.target.name}`)
    }
    const getFilteredQuantity = () => {
        let selectedSizeObj = product.sizes.filter((obj) => {
            return obj.size == sizevalue
        })[0];
        return selectedSizeObj.quantity
    }
    // confguring the Quantity conter of the prodcut
    const changeQuantity = (e) => {
        let name = e.target.getAttribute("name")
        if (name === "decrement" && quantity === 1) return
        if (name === "increment" && quantity === getFilteredQuantity()) return
        if (name === "decrement") return setQuantity(quantity - 1)
        if (name === "increment") return setQuantity(quantity + 1)
    }
    const { addItem, inCart } = useCart()
    const addToCart = () => {
        if (getFilteredQuantity() < 1) return toaster('info', 'This item is out of stock right now')
        if (inCart(`${product._id}${sizevalue}`)) return toaster('info', 'This item is already in the cart!')
        addItem({
            product_id: productData.id,
            variant_id: product._id,
            id: `${product._id}${sizevalue}`,
            category_id: productData.categories[0],
            name: productData.name,
            variant_sku: product.sku,
            price: productData.sale_price || productData.price,
            sale_price: productData.sale_price || 0,
            uf_points: productData.uf_points || 0,
            weight: productData.shipping_details.weight,
            stock: product.stock,
            size: sizevalue,
            sizes: product.sizes,
            color: product.color_name,
            images: product.images,
            categories: productData.categories.map(category => category._id)
        }, quantity);
        addToCartToast(productData.name, product.images[0], "cart")
    }
    return <>
        <Head>
            <title></title>
            <meta name="description" content="" />

            <meta property="og:url" content="https://ddc0-116-71-168-213.ngrok-free.app" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="" />
            <meta property="og:description" content="" />
            <meta property="og:image" content="" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="ddc0-116-71-168-213.ngrok-free.app" />
            <meta property="twitter:url" content="https://ddc0-116-71-168-213.ngrok-free.app" />
            <meta name="twitter:title" content="" />
            <meta name="twitter:description" content="" />
            <meta name="twitter:image" content="" />

            <title>{productData.name}</title>
            {/* <link rel="shortcut icon" href={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
            <link rel="apple-touch-icon" href={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
            <link rel="image_src" href={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
            <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
            <meta property="og:site_name" content="Urban Fits" />
            <meta property="og:image" itemprop="image primaryImageOfPage" content={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:domain" content="stackoverflow.com" />
            <meta name="twitter:title" property="og:title" itemprop="name" content={productData.name} />
            <meta name="twitter:description" property="og:description" itemprop="description" content={productData.description} />
            <meta name="facebook:card" content="summary" />
            <meta name="facebook:domain" content="stackoverflow.com" />
            <meta name="facebook:title" property="og:title" itemprop="name" content={productData.name} />
            <meta name="facebook:description" property="og:description" itemprop="description" content={productData.description} /> */}
        </Head>
        <link itemprop="thumbnailUrl" href={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
        <span itemprop="thumbnail" itemscope itemtype="http://schema.org/ImageObject">
            <link itemprop="url" href={process.env.NEXT_PUBLIC_BASE_IMG_URL + productData.cover_image} />
        </span>
        <main className="bg-white w-full max-w-[2000px] mx-auto h-full font_urbanist transition-all duration-700">
            <div className="w-full pb-20 flex justify-center">
                <section className='w-full p-5 md:p-7 lg:p-0 lg:pt-20 lg:w-[90%] h-full font_urbanist text-left pt-8' >
                    <div className="w-full flex flex-col lg:flex-row lg:justify-between">
                        <p className="lg:hidden font_urbanist text-sm text-gray-400"><Link href="/">{langObj.home}</Link>&nbsp;/&nbsp;{langObj.catalogue}&nbsp;/&nbsp;<Link href={`/products/category/${productData.categories[0]._id}?name=${productData.categories[0].name}`} className='capitalize'>{productData.categories[0].name}</Link>&nbsp;/&nbsp;<span className="text-pinky font_urbanist_medium">{productData.name}</span></p>
                        <div className="w-full lg:w-[55%] mb-3 mt-6 md:mt-10 lg:mt-0">
                            <h1 className="lg:hidden w-full mb-2 font_urbanist_bold text-xs md:text-lg">{productData.name.toUpperCase()}</h1>
                            <ProductCarousel img_array={product.images} />
                        </div>

                        <div className="details w-full lg:w-[40%]">
                            <p className="hidden lg:block mb-5 font_urbanist text-sm text-gray-400"><Link href="/" className='hover:text-pinky'>{langObj.home}</Link>&nbsp;/&nbsp;{langObj.catalogue}&nbsp;/&nbsp;<Link href={`/products/category/${productData.categories[0]._id}?name=${productData.categories[0].name}`} className='hover:text-pinky capitalize'>{productData.categories[0].name}</Link>&nbsp;/&nbsp;<span className="text-pinky font_urbanist_medium">{productData.name}</span></p>
                            <h1 className="hidden lg:block w-full mb-4 font_urbanist_bold lg:text-3xl capitalize">{productData.name}</h1>
                            <h2 className="hidden lg:block font_urbanist_bold lg:text-2xl text-pinky">{formatPrice(productData.price)}</h2>

                            <div className="w-full my-5 flex items-center text-sm lg:text-base gap-x-6">
                                <span className="w-12">Color :</span>
                                <span className="flex items-center gap-x-2">
                                    {productData.variants.map(({ color_name, color }, index) => <button key={index} name={color_name} onClick={onColorChange} style={{ background: color }} className={`w-6 aspect-square flex justify-center items-center border-[0.5px] rounded-full ${router.query.color?.toLowerCase() === color_name?.toLowerCase() && "equillibrium_shadow"} transition-all`}>{router.query.color?.toLowerCase() === color_name?.toLowerCase() && <i className={`fa-solid fa-check text-[8px] ${router.query.color?.toLowerCase() !== 'white' && "text-white"}`} />}</button>)}
                                </span>
                            </div>
                            <div className="w-full my-5 flex items-center text-sm lg:text-base gap-x-6">
                                <span className="w-12">Size :</span>
                                <span className="flex items-center gap-x-2">
                                    {product.sizes.map(({ size }, index) => <button key={index} onClick={onSizeChange} name={size} className={`w-6 h-6 aspect-square flex justify-center items-center font_urbanist_bold text-[8px] border-[0.5px] border-pinky rounded-full ${size === sizevalue ? "text-white bg-pinky equillibrium_shadow" : "text-black"} transition-all`}>{size}</button>)}
                                </span>
                            </div>
                            <p className="w-full mt-5 font_urbanist_medium text-sm lg:text-base text-gray-400">{productData.description}</p>
                            <p className="w-full font_urbanist_medium text-sm lg:text-base text-gray-400">Dimensions: {productData.shipping_details.width}' x {productData.shipping_details.width}' , Weight: {productData.shipping_details.weight} grams.</p>
                            <p className="my-5 text-sm lg:text-base font_urbanist_bold">{getFilteredQuantity()} {langObj.inStock}</p>

                            <span className="max-w-[320px] w-48pr lg:w-1/3 h-9 lg:h-[52px] my-5 px-5 hover:rounded-none font_urbanist border border-pinky rounded-xl flex justify-between items-center transition-all duration-300">
                                <span onClick={(e) => { changeQuantity(e) }} name="decrement" className="text-lg cursor-pointer transition-all text-pinky select-none">-</span>
                                <input type="number" readOnly className='w-3/5 h-auto font_urbanist text-center border-none outline-none pointer-events-none' value={quantity} />
                                <span onClick={(e) => { changeQuantity(e) }} name="increment" className="text-lg cursor-pointer transition-all text-pinky select-none">+</span>
                            </span>
                            {getFilteredQuantity() < 1 ? <span className="lg:max-w-[320px] w-full lg:w-48pr h-9 lg:h-[52px] my-2 flex justify-center items-center font_urbanist_bold italic text-center text-xs text-gray-300">Out of Stock</span>
                                : <>
                                    <button onClick={addToCart} className="group hidden lg:flex bg-gold hover:rounded-none max-w-[320px] w-48pr lg:w-1/3 h-9 lg:h-[52px] px-5 justify-between items-center rounded-xl font_urbanist_bold text-white text-sm transition-all duration-300"><p className="group-hover:translate-x-3 transition-all duration-300">{langObj.addToCart} </p><i className="fas fa-plus text-white group-hover:rotate-45 transition-all duration-300" /></button>
                                    <Button onClick={addToCart} classes='w-full lg:hidden uppercase' my='my-1' bg='bg-gold' fontSize='text-[10px]' text='white' >{langObj.addToCart} | {formatPrice(productData.price)}</Button>
                                </>}
                            <h5 className="mt-5 mb-2 text-sm lg:text-base font-semibold text-gray-500">{langObj.shareOnSocial}</h5>
                            <div className="flex items-center lg:text-lg text-gray-400 gap-x-4">
                                <FacebookShareButton hashtag='#justsomething' url={router.pathname}>
                                    <i className="fa-brands fa-facebook" />
                                </FacebookShareButton>
                                <LinkedinShareButton url={window.location.href}>
                                    <i className="fa-brands fa-linkedin-in" />
                                </LinkedinShareButton>
                                <TwitterShareButton url={router.asPath}>
                                    <i className="fa-brands fa-x-twitter" />
                                </TwitterShareButton>
                                <PinterestShareButton url={router.asPath}>
                                    <i className="fa-brands fa-pinterest" />
                                </PinterestShareButton>
                            </div>

                            {productData.bundle_items && productData.bundle_items.length !== 0 ?
                                <div className="w-full pt-7 2xl:pt-7 mt-7 2xl:mt-7 lg:border-t">
                                    <h1 className="font_urbanist_bold text-sm mid:text-base text-pinky">Match With</h1>
                                    <div className="grid w-full grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-2 2xl:gap-4">
                                        {productData.bundle_items.map((product, index) => {
                                            if (window.matchMedia('(min-width: 1024px)').matches) return <SmallShoppingcard key={index} product={product} />
                                            else return <Shoppingcard key={index} product={product} />
                                        })}
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>

                    <div className="w-full mt-36">
                        <h3 className="text-lg md:text-xl lg:text-2xl font_urbanist_bold">Similar Items</h3>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-6">
                            {productLoading ? <div className="w-full h-[30vh] col-span-full flex justify-center items-center"><BounceLoader /></div>
                                : similarProducts.map((product, index) => {
                                    if (window.matchMedia('(max-width: 760px)').matches && index > 3) return
                                    if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && index > 2) return
                                    else if (index > 4) return
                                    return <Shoppingcard margin='0' product={product} />
                                })}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </>
}
export async function getServerSideProps(context) {
    const { p_id } = await context.query
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/products/get/one?id=${p_id}`)
        return { props: { resProduct: data.product, p_id } }
    }
    catch (error) {
        console.error(error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}