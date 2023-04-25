import React from "react";
import Sidebaradmin from "../sidebar";

import ProfilePic from "../../../public/ProfilePic.png";
import Image from "next/image";
import Button from "@/components/buttons/simple_btn";
import { BasketIcon } from "@/public/sidebaricons/BasketIcon";
import Navbar from "@/components/navbar";
import AccountMenu from "@/components/accountmenu";
import CustomTab from "@/components/CustomTabs/CustomTab";

import { profileTabData } from "@/mock/customtabData";


export default function Profile({children}) {
  return (
    <Sidebaradmin>
      <div className={` mt-[40px] flex items-center font_futura `}>
        <Image width="150px" height="150px" src={ProfilePic} />

        <div className="ml-[30px]">
          <p className=" text-[22px] mb-0  "> Bilawal </p>

          <div className="flex  items-center mt-[18px] ">
            <Button classes="mt-0 mb-0"> Change Avtar </Button>{" "}
            <span className="ml-[20px]">
              {" "}
              <BasketIcon />
            </span>
          </div>

          <p className="text-[14px] mt-[10px] ">
            For best results use an image at least 256px by 256px in either .jpg
            or .png format
          </p>
        </div>
      </div>

      <div className="mt-[43px]" >
      <CustomTab tabdata={profileTabData}  >
        {children}
      </CustomTab>
      </div>

      
    </Sidebaradmin>
  );
}
