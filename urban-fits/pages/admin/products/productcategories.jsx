import React, { useEffect, useState } from 'react'
import toaster from '@/utils/toast_function'
import useCategories from '@/hooks/useCategories'

import Sidebaradmin from '../sidebar'
import Button from '@/components/buttons/simple_btn'
import Spinner from '@/components/loaders/spinner'
import CardAdmin from '@/components/cards/cardadmin'
import GenericTable3 from '@/components/GenericTables/GenericTable3'
import { Dots3Icon } from "@/public/icons/Dots3Icon";
import EditIcon from '@/public/icons/EditIcon'
import InputTextArea from '@/components/InputTextArea'
import { RightArrowIcon } from '@/public/sidebaricons/RightArrowIcon'
import { InputText } from '@/components/InputText'
import { InputSelect } from '@/components/InputSelect'
import { productCategoriesTableColumns, productCategoriesTableData, recentOrdersTableColumns, recentOrdersTableData } from '@/mock/tablesdata'
import { SearchIcon } from '@/public/sidebaricons/SearchIcon'

import styles from "@/styles/sidebar.module.css";


export default function productcategories() {
    const { categories, getCategories, createCategory, categLoading } = useCategories()
    console.log(categories)
    useEffect(() => {
        return async () => {
            if (!categories) await getCategories()
            if (!categories) return
        }
    }, [categories])


    if (!categories) return <div className="w-full h-screen flex justify-center items-center font_gotham_medium text-2xl tracking-expand">LOADING...</div>
    const tableData = categories.map((cat, index) => {
        return {
            id: <div className="flex gap-[10px]" > <input type="checkbox" /> <p>{cat._id}</p> </div>,
            name: cat.name,
            description: cat.description,
            slug: cat.slug,
            order: index,
            action: <Dots3Icon />
        }
    })
    console.log(tableData)
    return (
        <Sidebaradmin>
            <div className="flex mt-[15px] justify-between items-center ">
                <div>
                    <div className="font_futura">
                        <p className="not-italic text-[22px]  font-medium text-black">
                            Categories
                        </p>
                    </div>
                    <div className=" flex items-center mt-[15px] ">
                        <li className="  not-italic text-[14px] text-center font-medium text-black list-none">
                            Home
                        </li>
                        <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
                            <RightArrowIcon />
                        </li>
                        <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
                            Product
                        </li>
                        <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
                            <RightArrowIcon />
                        </li>
                        <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
                            Product Categories
                        </li>
                    </div>
                </div>
                {/*  */}
                <div>
                    <div id={styles.searchdiv} >
                        <div className="flex flex-row items-center gap-[10] w-[15.95px] h-[16px]"></div>
                        {/* <i className="material-symbols-outlined absolute">search</i> */}
                        <span className="absolute">
                            <SearchIcon />
                        </span>

                        <input
                            type="text"
                            id="search"
                            value=""
                            onChange=""
                            className="w-[139px] h-[17px] flex items-center text-[14px] font-[400] font_futuralt bg-transparent outline-none  "
                            placeholder="Search "
                        />
                    </div>
                </div>
                {/*  */}
            </div>

            <CardAdmin classes="mt-[20px] " >
                <div className='px-[60px] py-[40px] grid grid-cols-4 gap-[50px] ' >
                    <div className='col-span-1 flex flex-col gap-[31px]'>
                        <InputText label="Name" placeholder=" " />
                        <InputText label="Slug" placeholder=" " />
                        <InputSelect label="Parent" options={categories?.map((cat) => cat.path)} />
                        <div className="relative w-full data_field items-center">
                            <h2 className="mb-2 font_futura text-sm text-left">Description</h2>
                            {/* {touched.msg && errors.msg ? <Tooltip classes="form-error" content={errors.msg} /> : null} */}
                            <textarea rows={5} className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-300 focus:border-yellow-700 hover:border-yellow-600 transition" type="text" value={null} name="msg" id="msg" maxLength={1000} onBlur={null} onChange={null} placeholder="" />
                        </div>
                        <Button classes="w-11/12" my="my-[0px]" >
                            Create Category
                        </Button>
                    </div>
                    <div className='col-span-3 flex flex-col gap-[31px] ' >
                        <GenericTable3 columns={productCategoriesTableColumns} data={productCategoriesTableData} />
                    </div>

                </div>
            </CardAdmin>
        </Sidebaradmin>
    )
}