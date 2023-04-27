import React from 'react'

export const InputSelect = (props) => {
  return (
    <div className='flex flex-col' >

<label className='font_futura text-[14px] leading-[17-px]  font-semibold flex items-center ' >
         <span> {props?.label } </span>
         <span className={`font_futura_light text-[12px] leading-[17px]  text-[${props.postlabelcolor||"#E4E4E4" }]  ml-[5px] `} > {props?.postlabel} </span> 
         </label>
        
    <select  className={`  text-[12px]
     ${props.width || "w-[100px]"}  mt-[12px] h-[44px] px-[8px] py-[13.5px] border-[1px] rounded-lg outline-none  bg-transparent `}
        placeholder={` ${props.placeholder || "placeholder" } `}
     >
        {props.options?.map((opt, index)=>(

            <option value={opt[index]} > {opt} </option>

        ))}
     </select>

    </div>
  )
}
