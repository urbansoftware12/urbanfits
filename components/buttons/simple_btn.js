import React from 'react'
import Spinner from '../loaders/spinner'

export default function Button(props) {

  return (
    <button disabled={props.disabled || props.loading} {...props} className={`${props.classes} flex justify-center items-center ${props.height ? props.height : 'h-11'} ${props.font ? props.font : 'font_urbanist_bold'} ${props.bg ? props.bg : "bg-[#FF4A60]"} ${props.my ? props.my : "my-6"} py-1 md:py-2 px-5  ${props?.rounded || "rounded-full"} text-${props.text ? props.text : "white"} text-center ${props.fontSize ? props.fontSize : 'text-sm md:text-base'} transition hover:shadow-xl ${props.disabled && "opacity-60 pointer-events-none"} overflow-hidden`} >
      {props.loading? <Spinner forBtn={true} />: props.children}
    </button>
  )
}
