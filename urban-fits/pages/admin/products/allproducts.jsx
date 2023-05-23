import React from 'react'

import Sidebaradmin from "../sidebar";
import CardAdmin from "@/components/cards/cardadmin";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import Button from "@/components/buttons/simple_btn";
import GenericTable1 from "@/components/GenericTables/GenericTable1";

import {  productListTableColumns, productListTableData } from '@/mock/tablesdata';
import Link from 'next/link';


const allproducts = () => {
  return (
    <Sidebaradmin> 
    <div className="flex mt-[15px] justify-between items-center ">
      <div>
        <div className="font_futura">
          <p className="not-italic text-[22px]  font-medium text-black">
            Product List
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
            Products
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            <RightArrowIcon />
          </li>
          <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
            Products List
          </li>
        </div>
      </div>
      {/*  */}
      <div>
        <Link href="/admin/products/addproduct" >
          <Button  my="my-[0px]"> Add Product</Button>
          </Link>
      </div>
      {/*  */}
    </div>

    <CardAdmin classes="px-[40px] py-[42px] mt-[20px] ">
      <div className="grid grid-cols-1">
        {/* <div className="flex flex-col  "> */}
          <GenericTable1
          border={true}
            columns={productListTableColumns}
            data={productListTableData}
            options={["All Products", "others"]}
          />
        </div>
      {/* </div> */}
    </CardAdmin>
  </Sidebaradmin>
  )
}

export default allproducts