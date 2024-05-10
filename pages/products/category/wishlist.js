import { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '@/hooks/useUser';
import useLanguage from '@/hooks/useLanguage';
import { categoryPage as categoryLang } from '@/locales';
import Shoppingcard from '@/components/cards/shoppingcard';
import Spinner from '@/components/loaders/spinner';
import BounceLoader from '@/components/loaders/bounceLoader';
import ListingShopSection from '@/components/listingShop_section';
import toaster from '@/utils/toast_function';
import Link from 'next/link';
import Image from 'next/image';
const emptyWishlist = process.env.NEXT_PUBLIC_BASE_IMG_URL + '/website-copyrights/emptyWishlist.webp';

export default function WisthList() {
    const { wishList } = useUser();
    const { locale } = useLanguage();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const langObj = categoryLang[locale];

    const fetchMoreWishListProducts = async () => {
        setLoader(true)
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/products/get/byids?page=${page + 1}`, { productIds: wishList })
            if (!data.products || data.products.length === 0) {
                setLoader(false)
                return toaster("info", "No more products available.")
            }
            setProducts(products.concat(data.products))
            setPage(page + 1)
            return setLoader(false)
        } catch (error) {
            console.log(error)
            return setLoader(false)
        }
    }
    const fetchWishListProducts = async (currentPage, idsArray) => {
        setLoading(true)
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/api/products/get/byids?page=${currentPage}`, { productIds: idsArray })
            if (!data.products) return setLoading(false)
            setProducts(data.products)
            return setLoading(false)
        } catch (error) {
            console.log(error)
            return setLoading(false)
        }
    }

    useEffect(() => {
        if (page == 1) fetchWishListProducts(1, wishList)
    }, [])

    return <>
        <main className="w-full pb-20 bg-white font_urbanist overflow-hidden">
            {loading ? <div className="w-full layout_height flex justify-center items-center"><Spinner forBtn variant="border-black" /></div> :
                products.length === 0 ? <section className="w-full layout_height flex flex-col justify-center items-center gap-y-3 md:gap-y-5">
                    <Image width={250} height={250} src={emptyWishlist} alt='Wishlist is empty' />
                    <h2 className="font_urbanist_bold text-lg lg:text-xl">{langObj.wishlistEmptyTitle}</h2>
                    <p className="font_urbanist text-sm">{langObj.wishlistEmptyMsg}</p>
                    <Link href='/' className="font_urbanist mt-2 text-sm bg-gray-100 px-4 py-1 rounded-full">{langObj.goShopping}</Link>
                </section>
                    :
                    <>
                        <section className='w-full p-5 md:p-7 lg:p-14 xl:p-16 2xl:p-24 h-full font_urbanist text-left' >
                            <div className="w-full my-4 md:my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-8">
                                <h1 className="col-span-full font_urbanist_bold capitalize text-lg md:text-xl lg:text-2xl">{langObj.wishlist}&nbsp;</h1>
                                {products.map((product, index) => <Shoppingcard key={index} margin='0' product={product} />)}
                            </div>

                            <button disabled={loading} onClick={fetchMoreWishListProducts} className={`${loading && 'pointer-events-none'} lg:mt-20 group flex items-center mx-auto font_copper text-xs md:text-sm tracking-expand md:tracking-[1.5em] md:hover:tracking-[1em] transition-all duration-300`}>
                                <i className="w-16 group-hover:w-28 h-0.5 mx-1 bg-black transition-all" />
                                <i className="w-5 group-hover:w-0 h-0.5 mx-1 bg-black transition-all" />
                                {loader ? <BounceLoader /> : <p className='uppercase'>&nbsp;{langObj.more}</p>}
                                <i className="w-5 group-hover:w-0 h-0.5 mx-1 bg-black transition-all" />
                                <i className="w-16 group-hover:w-28 h-0.5 mx-1 bg-black transition-all" />
                            </button>
                        </section></>}
        </main>
        <ListingShopSection whiteTheme />
    </>
}