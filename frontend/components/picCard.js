import React from 'react'
import LinkBtn from './link_btn'
import Image from 'next/image'

export default function PicCard(props) {
    return (
        <div className='relative w-full lg:w-[47%] h-full rounded-3xl font_futuraLT overflow-hidden' >
            <Image unoptimized={true} src={props.img} className={`w-full h-full object-cover object-${props.object_fit? props.object_fit: "top"}`} alt='' ></Image>
            <div className="absolute w-full bottom-0 left-0 p-3 lg:p-7 text-white flex flex-col items-start text-5xl">
                <h3 className="text-3xl lg:text-4xl">New In</h3>
                <h3 className="text-3xl lg:text-4xl mt-1 mb-4">Ready To Wear</h3>
                <LinkBtn href="/" my="my-0" classes="w-1/2">Shop Now</LinkBtn>
            </div>
        </div>
    )
}
