import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
const CatalogueCarousel = dynamic(() => import('@/components/carousels/catalogueCarousel'));
import BounceLoader from '@/components/loaders/bounceLoader';
import useCategories from '@/hooks/useCategories';
import toaster from '@/utils/toast_function';

export default function ProductCatalogueCategory() {
    const { categories, categLoading, getCategories } = useCategories()
    const rootCategories = categories.filter(category => !category.parent || category.slug === "default/")
    const [selectedCategory, setSelectedCategory] = useState('')
    const respectedCategories = categories.filter(category => category.parent === selectedCategory._id)
    useEffect(() => {
        if (!categories.length) getCategories((firstCategory)=>setSelectedCategory(firstCategory))
    }, [])

    return <>
        <main className="w-full pb-10 bg-white font_urbanist overflow-hidden">
            <CatalogueCarousel />
            <section className='w-full p-5 md:p-7 lg:p-14 xl:p-16 2xl:p-24 h-full font_urbanist text-left' >
                <h1 className="font_urbanist_bold capitalize text-lg md:text-xl lg:text-2xl">Shop by Category&nbsp;</h1>
                <div className="w-full my-4 md:my-10 flex gap-x-4 md:gap-x-6 lg:gap-x-8">
                    <section className="w-1/4">
                        {rootCategories.map((category, index) => <button onClick={() => setSelectedCategory(category)} key={index} href={`/products/category/${category._id}?name=${category.name}`} className={`w-full p-2 md:p-3 lg:py-5 lg:px-4 text-sm text-left md:text-base flex lg:justify-between items-center border-b ${selectedCategory._id === category._id ? "border-black font_copper" : "border-gray-200 font_urbanist"} bg-gray-50 ${index == 0 ? "rounded-t-xl" : index == rootCategories.length - 1 ? "rounded-b-xl" : null} capitalize transition-all overflow-hidden`}>
                            {category.name}
                            <i className="hidden lg:block arrow material-symbols-outlined text-lg text-gray-600 transition-all">chevron_right</i>
                        </button>)}
                    </section>
                    <section className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
                        {categLoading ? <div className="w-full h-10 col-span-full flex justify-center items-center"><BounceLoader /></div> :
                            selectedCategory ? <><Link className='w-full aspect-square flex flex-col items-center gap-y-1 lg:gap-y-2' href={`/products/category/${selectedCategory._id}?name=${selectedCategory.name}`}>
                                <div className="w-full aspect-square border border-black rounded-full overflow-hidden">
                                    <Image src="https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"
                                        className="w-full h-full object-cover" width={500} height={500} alt="category" />
                                </div>
                                <span className='font_copper text-sm md:text-base lg:text-lg'>{selectedCategory.name}</span>
                            </Link>
                                {respectedCategories.map((category, index) => {
                                    return <Link key={index} href={`/products/category/${category._id}?name=${category.name}`} className='relative equillibrium_shadow group select-none w-full aspect-square rounded-xl hover:rotate-180 hover:rounded-[100px] transition-all duration-1000 overflow-hidden'>
                                        <Image src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="w-full h-full object-cover" width={500} height={500} alt="category" />
                                        <span className="absolute group-hover:rotate-180 text-base md:text-lg lg:text-2xl max-w-full gradient_text font_urbanist_extra_bold capitalize left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:opacity-0 group-hover:opacity-100 transition-all duration-1000">{category.name}</span>
                                        <div className="absolute left-0 bottom-0 w-full flex flex-col items-start h-1/2 p-1.5 lg:p-2 bg-subtle-white group-hover:translate-y-full transition-all duration-1000">
                                            <span className="hidden md:block text-base md:text-lg lg:text-2xl max-w-full gradient_text font_urbanist_extra_bold capitalize transition-all duration-500">{category.name}</span>
                                            <span className="hidden md:block w-full mt-0.5 md:text-[8px] lg:text-10px text-white overflow-hidden">{category.description}</span>
                                        </div>
                                    </Link>
                                })}</> : null}
                    </section>
                </div>
            </section>
        </main>
    </>
}