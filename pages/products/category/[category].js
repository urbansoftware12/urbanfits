import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
import axios from 'axios';
const CatalogueCarousel = dynamic(() => import('@/components/carousels/catalogueCarousel'));
const FilterBar = dynamic(() => import('@/components/filters-offcanvas'));
import { NoProductsSection } from '@/components/more_to_explore';
import Shoppingcard from '@/components/cards/shoppingcard';
import MoreToExplore from '@/components/more_to_explore';
import BounceLoader from '@/components/loaders/bounceLoader';
import ListingShopSection from '@/components/listingShop_section';
import useProduct from '@/hooks/useProduct';
import toaster from '@/utils/toast_function';

export default function ProductCatalogueCategory({ products, minPrice, maxPrice, availableColors, availableSizes, category, name }) {
    const { getProducts, productLoading } = useProduct()
    const [fRecourses, setFRecourses] = useState({ minPrice, maxPrice, availableColors, availableSizes })
    const [catalogueProducts, setCatalogueProducts] = useState(products)
    const [filteredData, setFilteredData] = useState({ array: catalogueProducts })
    const [page, setPage] = useState(1)
    const [filterBar, setFilterBar] = useState(false)

    useEffect(() => {
        setCatalogueProducts(products)

        return () => {
            setCatalogueProducts([])
            setFilteredData({ array: [] })
            setPage(1)
            setFilterBar(false)
        }
    }, [category, name])

    return <>
        <FilterBar show={filterBar} setFilterBar={setFilterBar} array={catalogueProducts} minPrice={fRecourses.minPrice} maxPrice={fRecourses.maxPrice} availableColors={fRecourses.availableColors} availableSizes={fRecourses.availableSizes} onFilter={(filterData) => setFilteredData(filterData)} />
        <main className="w-full pb-20 bg-white font_urbanist">
            <CatalogueCarousel />
            <section className='w-full p-5 md:px-7 lg:px-14 xl:px-20 xl:pb-16 xl:pt-12 h-full font_urbanist text-left' >
                <nav className="sticky z-30 top-[50px] bg-white/60 backdrop-blur-sm py-1 lg:py-1.5 w-full flex items-center justify-between">
                    <h1 className="font_urbanist_bold capitalize text-lg md:text-xl lg:text-2xl">{name}&nbsp;</h1>
                    <div className="flex items-center gap-x-1 md:gap-x-2">
                        {/* {filteredData?.appliedFilters?.priceFilters ? <button onClick={() => filteredData.dropSpecificFilter("price_filter")} className="flex items-center text-10px lg:text-xs bg-red-500 text-white px-4 py-1.5 rounded-full gap-x-1.5"><i className="fa-solid fa-xmark" /> Price Filter</button> : null}
                        {filteredData?.appliedFilters?.colorFilters ? <button onClick={() => filteredData.dropSpecificFilter("color_filter")} className="flex items-center text-10px lg:text-xs bg-red-500 text-white px-4 py-1.5 rounded-full gap-x-1.5"><i className="fa-solid fa-xmark" /> Color Filter</button> : null}
                        {filteredData?.appliedFilters?.sizeFilters ? <button onClick={() => filteredData.dropSpecificFilter("size_filter")} className="flex items-center text-10px lg:text-xs bg-red-500 text-white px-4 py-1.5 rounded-full gap-x-1.5"><i className="fa-solid fa-xmark" /> Size Filter</button> : null} */}
                        <button onClick={() => setFilterBar(true)} className="bg-white border border-pink-300 px-4 py-2 rounded-full flex items-center font_urbanist text-xs md:text-[15px] cursor-pointer">
                            <span className="w-4 aspect-square material-symbols-outlined mr-2 hover:shadow-md"><svg className='w-full h-full' xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                <path d="M23.1193 42.875L18.9675 44.2575V26.3438L9.5259 15.958C8.82083 15.1823 8.43011 14.1717 8.43 13.1234V8.43H42.15V13.0075C42.1498 14.1253 41.7055 15.1972 40.915 15.9875L31.6125 25.29V28.4513" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M38.8201 32.8981C39.2311 32.4871 39.7191 32.1611 40.256 31.9386C40.793 31.7162 41.3686 31.6017 41.9498 31.6017C42.531 31.6017 43.1065 31.7162 43.6435 31.9386C44.1805 32.1611 44.6684 32.4871 45.0794 32.8981C45.4904 33.3091 45.8164 33.797 46.0389 34.334C46.2613 34.871 46.3758 35.4465 46.3758 36.0277C46.3758 36.6089 46.2613 37.1845 46.0389 37.7215C45.8164 38.2584 45.4904 38.7464 45.0794 39.1574L37.935 46.365H31.6125V40.0425L38.8201 32.8981Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></span>
                            Filters
                        </button>
                    </div>
                </nav>
                <div className="w-full my-4 md:mb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-2 xl:gap-4 2xl:gap-8">
                    <ListingShopSection classes='my-12 col-span-full row-start-2 row-end-3' />
                    {filteredData?.array?.length !== 0 ? filteredData?.array?.map((product, index) => <Shoppingcard key={index} margin='0' product={product} />)
                        : <NoProductsSection />}
                </div>

                {catalogueProducts.length === 0 ? null :
                    <button disabled={productLoading} onClick={async () => {
                        await getProducts(page + 1, category, minPrice, maxPrice, (data) => {
                            if (!data?.products?.length) return toaster('info', "No more products available")
                            setFRecourses(prev => {
                                const availableColorsSet = []
                                const allAvailableColors = [...prev.availableColors, ...data.available_colors]
                                allAvailableColors.forEach(colorObj => {
                                    const matchedColor = availableColorsSet.find(newColorObj => newColorObj?.color_name?.toLowerCase() === colorObj?.color_name?.toLowerCase())
                                    if (!matchedColor) availableColorsSet.push(colorObj)
                                });
                                return {
                                    minPrice: data.min_price,
                                    maxPrice: data.max_price,
                                    availableColors: availableColorsSet,
                                    availableSizes: Array.from(new Set([...prev.availableSizes, ...data.available_sizes]))
                                }
                            })
                            setCatalogueProducts([catalogueProducts.concat(data.products)].flat())
                            return setPage(page + 1)
                        })
                    }} className={`${productLoading && 'pointer-events-none'} mt-10 lg:mt-20 group flex items-center mx-auto font_copper text-xs md:text-sm tracking-expand md:tracking-[1.5em] md:hover:tracking-[1em] transition-all duration-300`}>
                        <i className="w-16 group-hover:w-28 h-0.5 mx-1 bg-black transition-all"></i>
                        <i className="w-5 group-hover:w-0 h-0.5 mx-1 bg-black transition-all"></i>
                        {productLoading ? <BounceLoader /> : <p>&nbsp;MORE</p>}
                        <i className="w-5 group-hover:w-0 h-0.5 mx-1 bg-black transition-all"></i>
                        <i className="w-16 group-hover:w-28 h-0.5 mx-1 bg-black transition-all"></i>
                    </button>}
                {catalogueProducts && catalogueProducts.length ? <MoreToExplore categoryId={category} /> : null}
            </section>
        </main>
        <ListingShopSection whiteTheme />
    </>
}
export async function getServerSideProps(context) {
    const { category, name } = await context.query
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/products/get/bycategory?id=${category}`)
        return {
            props: {
                products: data.products,
                minPrice: data.min_price,
                maxPrice: data.max_price,
                availableColors: data.available_colors,
                availableSizes: data.available_sizes,
                category, name
            }
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}