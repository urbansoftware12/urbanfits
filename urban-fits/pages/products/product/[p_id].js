import React, { useEffect, useState } from 'react'
import { useCart } from "react-use-cart";
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Shoppingcard, { SmallShoppingcard } from '@/components/cards/shoppingcard';
import ProductCarousel from '@/components/carousels/productCarousel';
import Cutomization from '@/components/modals/cutomization';
import toaster from '@/utils/toast_function';
// image imports
import image1 from '@/public/card imgs/card img14.png'
import image2 from '@/public/card imgs/card img17.jpg'
import image3 from '@/public/card imgs/card img2.jpg'
import image4 from '@/public/card imgs/card img3.jpg'

export default function Product(props) {
    console.log(props.response.product)
    const productData = { ...props.response.product, id: props.response.product._id }
    const router = useRouter()
    const [product, setProduct] = useState(productData.variants[0])
    const [sizevalue, setSizevalue] = useState(product.size[0])

    useEffect(() => {
        const { color } = router.query
        if (!color) return
        let newProduct = productData.variants.filter((variant) => {
            return variant.color_name === color
        })
        setProduct(newProduct[0])
        setSizevalue(newProduct[0].size[0])
    }, [router.query.color])
    // confguring the Quantity conter of the prodcut
    const [quantity, setQuantity] = useState(1)
    const changeQuantity = (e) => {
        let name = e.target.getAttribute("name")
        if (name === "decrement" && quantity === 1) return
        if (name === "increment" && quantity === product.stock) return
        if (name === "decrement") return setQuantity(quantity - 1)
        if (name === "increment") return setQuantity(quantity + 1)
    }
    // size vaue channge funciton
    const onSizeChange = (e) => {
        setSizevalue(e.target.value)
    }
    const onColorChange = (e) => {
        console.log(e.target.value)
        router.push(`/products/product/${productData.id}?color=${e.target.value}`)
    }

    // setting up teh toggle fucntion and state for the size cutomization modal 
    const [modal4, setModal4] = useState(false)
    const toggleModal = (e) => {
        if (e.target.name === "modal4") {
            if (modal4 === false) return setModal4(true)
            if (modal4 === true) return setModal4(false)
        }
    }
    //Cart function
    const { addItem } = useCart()
    // temporary product data to show the  similar items cards
    const si_product = {
        name: 'Sample Product title - UF',
        price: '76.99',
        variants: [1, 2, 3, 4]
    }
    return (
        <>
            <Cutomization show={modal4} toggleModal={toggleModal} toaster={toaster} />
            <Navbar />
            <main className={`bg-white w-full h-full font_gotham transition-all duration-700 overflow-x-hidden overflow-y-scroll`}>
                <div className="w-full pb-20 flex justify-center">
                    <section className='w-full p-5 md:p-7 lg:p-0 lg:pt-9 lg:w-[90%] h-full font_gotham text-left pt-5' >
                        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:space-x-2">
                            <div className="w-full lg:w-[55%] mb-3">
                                <ProductCarousel img_array={product.images} />
                            </div>

                            <div className="details w-full lg:w-[40%]">
                                <h1 className="w-full mb-7 sm:font_gotham_medium lg:font_gotham_bold text-xs md:text-lg lg:text-3xl xl:text-[32px] lg:tracking-[0.15em]">{productData.name.toUpperCase()}</h1>
                                <h2 className="font_gotham_black text-xs md:text-lg lg:text-3xl xl:text-[32px] lg:tracking-[0.15em]">${productData.price}</h2>

                                <div className="w-full my-8 flex justify-between">
                                    <div className="w-48pr flex flex-col">
                                        <h3 className="mb-3 font_gotham_medium italic text-xs text-gray-300 tracking-[0.15em]">DESCRIPTION</h3>
                                        <p className="font_gotham text-xs 2xl:text-sm">{productData.description}</p>
                                    </div>
                                    <div className="w-48pr flex flex-col font_gotham text-xs 2xl:text-sm">
                                        <h3 className="mb-3 font_gotham_medium italic text-xs text-gray-300 tracking-[0.15em]">SUMMARY</h3>
                                        <p className='capitalize'>Color: {router.query.color}</p>
                                        <p>In Stock: {product.stock}</p>
                                        <p>Height of model: </p>
                                    </div>
                                </div>

                                <div className="w-full gap-4 flex flex-wrap justify-between">
                                    <select type="select" defaultValue={productData.variants.color_name} onChange={onColorChange} className="max-w-[320px] w-48pr h-[52px] font_gotham_medium tracking-widest text-xs px-5 border outline-none">
                                        {productData.variants.map(variant => {
                                            let { color, color_name } = variant
                                            return <option value={color_name}>{color_name.toUpperCase()}</option>
                                        })}
                                    </select>
                                    <span className="max-w-[320px] w-48pr h-[52px] px-5 font_gotham_light border flex justify-between items-center">
                                        <span onClick={(e) => { changeQuantity(e) }} name="decrement" className="text-lg cursor-pointer transition-all text-gray-300 select-none">-</span>
                                        <input type="number" readOnly className='w-3/5 h-auto font_gotham text-center border-none outline-none pointer-events-none' value={quantity} />
                                        <span onClick={(e) => { changeQuantity(e) }} name="increment" className="text-lg cursor-pointer transition-all text-gray-300 select-none">+</span>
                                    </span>
                                    <div className="flex flex-col max-w-[320px] w-48pr">
                                        <select type="select" defaultValue={product.size} onChange={onSizeChange} className="w-full h-[52px] font_gotham_medium tracking-widest text-xs px-5 border outline-none">
                                            {product.size.map(size => {
                                                return <option value={size}>{size}</option>
                                            })}
                                        </select>
                                        <button onClick={toggleModal} name="modal4" className="my-2 font_gotham_medium italic text-left text-xs text-gray-300 tracking-[0.15em]">OR CUSTOMIZED SIZE</button>
                                    </div>
                                    <button onClick={() => { addItem({ product_id: productData.id, id: product._id, name: productData.name, price: productData.price, shipping_fee: productData.shipping_detials.fees, stock: product.stock, size: sizevalue, sizes: product.size, color: product.color_name, images: product.images }, quantity); toaster('success', 'Your items has been added to the cart') }} className="bg-gold max-w-[320px] w-48pr h-[52px] px-5 flex justify-between items-center font_gotham_medium text-white text-sm">Add to Cart <i className="fas fa-plus text-white" /></button>
                                </div>

                                <div className="w-full pt-7 2xl:pt-7 mt-7 2xl:mt-7 border-t">
                                    <h1 className="font_gotham_medium text-xs text-gray-300 italic">MATCH WITH</h1>
                                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 2xl:gap-6">
                                        <SmallShoppingcard product={si_product} img={image3} />
                                        <SmallShoppingcard product={si_product} img={image4} />
                                        <SmallShoppingcard product={si_product} img={image1} />
                                        <SmallShoppingcard classes='md:hidden' product={si_product} img={image1} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-36">
                            <h3 className="text-xl lg:text-[26px] font_gotham_bold tracking-widest">SIMILAR ITEMS</h3>
                            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 xl:gap-5 2xl:gap-12">
                                <Shoppingcard product={si_product} img={image1} />
                                <Shoppingcard product={si_product} img={image2} />
                                <Shoppingcard product={si_product} img={image1} />
                                <Shoppingcard product={si_product} img={image2} />
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const { p_id } = await context.query
    // let response = await (await fetch(`${process.env.HOST}/api/products/getsingleproduct?id=${p_id}`)).json()
    let response = {
        product: {
            "seo_detials": {
                "title": "Vintage Shirt",
                "description": "Round neck waistcoat featuring front welt pockets, contrast trims, a pleat in the back and metal appliqué fastening in the front.",
                "meta_keywords": [
                    "T-Shirt",
                    "Men",
                    "vintage",
                    "summer"
                ]
            },
            "shipping_detials": {
                "width": "18",
                "height": "30",
                "weight": "250",
                "fees": 3.24
            },
            "_id": "6416bff63b9101bcd0595a31",
            "name": "Vintage T-Shirt",
            "price": 78.99,
            "description": "Round neck waistcoat featuring front welt pockets, contrast trims, a pleat in the back and metal appliqué fastening in the front.",
            "category": "T-Shirt",
            "slug": "Cool vintage Men T-shirt",
            "tags": [
                "T-Shirt",
                "Men",
                "vintage",
                "summer"
            ],
            "ratings": 0,
            "createdAt": "2023-03-19T07:55:34.175Z",
            "updatedAt": "2023-03-19T07:55:34.175Z",
            "__v": 0,
            "variants": [
                {
                    "color": "#000000",
                    "color_name": "black",
                    "images": [
                        {
                            "public_id": "1",
                            "url": "https://i.etsystatic.com/36407195/r/il/fb3379/4333913052/il_1140xN.4333913052_pau8.jpg",
                            "_id": "6416bff63b9101bcd0595a33"
                        },
                        {
                            "public_id": "2",
                            "url": "https://i.etsystatic.com/36407195/r/il/4cfe4e/4381306977/il_1140xN.4381306977_ee7f.jpg",
                            "_id": "6416bff63b9101bcd0595a34"
                        },
                        {
                            "public_id": "1",
                            "url": "https://i.etsystatic.com/36407195/r/il/fb3379/4333913052/il_1140xN.4333913052_pau8.jpg",
                            "_id": "6416bff63b9101bcd0595a33"
                        },
                        {
                            "public_id": "2",
                            "url": "https://i.etsystatic.com/36407195/r/il/4cfe4e/4381306977/il_1140xN.4381306977_ee7f.jpg",
                            "_id": "6416bff63b9101bcd0595a34"
                        }
                    ],
                    "size": [
                        "M",
                        "L",
                        "XL"
                    ],
                    "stock": 28,
                    "_id": "6416bff63b9101bcd0595a32"
                },
                {
                    "color": "#ff0000",
                    "color_name": "red",
                    "images": [
                        {
                            "public_id": "1",
                            "url": "https://i.etsystatic.com/6920740/r/il/574a03/3912644169/il_1140xN.3912644169_hz8i.jpg",
                            "_id": "6416bff63b9101bcd0595a36"
                        },
                        {
                            "public_id": "2",
                            "url": "https://i.etsystatic.com/6920740/r/il/6d3dde/3912644185/il_1140xN.3912644185_7ya6.jpg",
                            "_id": "6416bff63b9101bcd0595a37"
                        },
                        {
                            "public_id": "1",
                            "url": "https://i.etsystatic.com/6920740/r/il/574a03/3912644169/il_1140xN.3912644169_hz8i.jpg",
                            "_id": "6416bff63b9101bcd0595a36"
                        },
                        {
                            "public_id": "2",
                            "url": "https://i.etsystatic.com/6920740/r/il/6d3dde/3912644185/il_1140xN.3912644185_7ya6.jpg",
                            "_id": "6416bff63b9101bcd0595a37"
                        },
                    ],
                    "size": [
                        "S",
                        "L"
                    ],
                    "stock": 32,
                    "_id": "6416bff63b9101bcd0595a35"
                }
            ]
        }
    }
    return { props: { response, p_id } }
}