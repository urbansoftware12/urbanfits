import { useEffect, useState } from 'react'
import useCategories from '@/hooks/useCategories'
import useProduct from '@/hooks/useProduct'
import Shoppingcard from './cards/shoppingcard'
import Button from './buttons/simple_btn'
import Link from 'next/link'
import Image from 'next/image';
const EmtpyOrderImg = process.env.NEXT_PUBLIC_BASE_IMG_URL + "/website-copyrights/empty-order.webp"

export const NoProductsSection = () => {
    return <section className="col-span-full w-full flex flex-col items-center gap-y-4 pt-[40%] md:pt-[30%] lg:pt-[16%]">
        <Image src={EmtpyOrderImg} width={150} height={150} alt='empty orders' />
        <span className="font_urbanist_bold text-[17px]">No Products</span>
        <span className="font_urbanist text-sm">No products available yet.</span>
        <Link href="/products/category/all-categories" className='font_urbanist text-sm px-4 py-2 rounded-full bg-gray-100'>Browse all Categories</Link>
    </section>
}

export default function MoreToExplore({ categoryId = "64a59d5816b4c91fa1967b2e" }) {
    const { getRelativeCategories, categLoading } = useCategories()
    const { getProducts, productLoading } = useProduct()
    const [exploreData, setExploreData] = useState(null)
    const [displayProducts, setDisplayProducts] = useState([])
    const [activeItem, setActiveItem] = useState("latest_arrivals")

    const getExploreItems = async (e) => {
        const { name } = e.target
        if (!name || name === "latest_arrivals") {
            setActiveItem(name)
            setDisplayProducts(exploreData?.latest_arrivals || [])
        }
        else getProducts(1, name, null, null, (data) => {
            setDisplayProducts(data.products)
            setActiveItem(name)
        }, 5)
    }

    useEffect(() => {
        let category_id = categoryId
        if (typeof categoryId === "object") category_id = categoryId._id
        if (categoryId) getRelativeCategories(category_id, (data) => {
            setExploreData(data)
            setDisplayProducts(data.latest_arrivals)
        })
    }, [])

    return <div className="w-full mt-12 lg:mt-20 xl:mt-28">
        <h3 className="text-lg md:text-2xl text-center md:text-left font_urbanist_bold">More To Explore</h3>
        <div className="w-full mt-5 flex flex-wrap">
            <Button name="latest_arrivals" onClick={getExploreItems} fontSize='text-xs md:text-[15px]' classes="mr-3 px-3 md:px-5 whitespace-nowrap" height='h-[34px]' font='font_urbanist_medium' my="my-1" text={activeItem === "latest_arrivals" ? 'white' : 'black'} bg={activeItem === "latest_arrivals" ? 'bg-gold-land' : 'bg-gray-50'}>Latest Arrivals</Button>
            {exploreData?.relative_categories ? exploreData?.relative_categories?.map(category =>
                <Button key={category._id} name={category._id} onClick={getExploreItems} fontSize='text-xs md:text-[15px]' classes="mr-3 px-3 md:px-5 whitespace-nowrap capitalize" height='h-[34px]' font='font_urbanist_medium' my="my-1" text={activeItem === category._id ? 'white' : 'black'} bg={activeItem === category._id ? 'bg-gold-land' : 'bg-gray-50'}>{category.name}</Button>
            ) : null}
        </div>
        <section className="w-full">
            {productLoading || categLoading ? <span className="self-center w-full min-h-[330px] mid:h-[380px] lg:h-[360px] flex justify-center items-center font_urbanist_bold text-gray-500 text-[10px] md:text-base">Loading...</span> :
                <div className="w-full h-auto md:h-[290px] lg:h-[380px] xl:h-[430px] 2xl:h-[470px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 lg:gap-2 xl:gap-4 2xl:gap-8">
                    {displayProducts.length ? displayProducts.map((product, i) => {
                        if (window.matchMedia('(max-width: 760px)').matches && i > 3) return
                        if (window.matchMedia('(min-width: 760px) and (max-width: 1024px)').matches && i > 2) return
                        else if (i > 4) return
                        return <Shoppingcard key={i} margin="0" product={product} />
                    }) : <NoProductsSection />}
                </div>}
        </section>
    </div>
}
