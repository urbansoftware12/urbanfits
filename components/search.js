import { useState } from 'react'
import toaster from '@/utils/toast_function';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import BounceLoader from './loaders/bounceLoader';

export default function Search(props) {
    const [loader, setLoader] = useState(null)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const onSearch = async (e) => {
        const { value } = e.target
        setLoader(<div className="flex justify-center"><BounceLoader /></div>)
        setQuery(value)
        if (value === '') return
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/search?q=${value}`)
            setResults(data)
        } catch (error) {
            console.log(error)
            toaster("error", error.response.data.msg)
        }
        setLoader(null)
    }
    return <div className={`${props.classes} relative z-50 w-full md:w-1/3 xl:w-2/5 h-9 lg:h-10 px-6 justify-between items-center font_urbanist bg-gray-100 text-xs md:text-sm rounded-full`}>
        <input type="text" name='search_box' role='search' value={query} onChange={onSearch} className='w-full bg-transparent border-none outline-none' placeholder='Search Products' />
        {query === '' ? <i className="fa-solid fa-magnifying-glass text-xl text-gray-400" /> : <button onClick={() => setQuery('')} className="fa-solid fa-xmark text-xl text-gray-700" />}
        {query !== '' ? <div className="absolute top-full right-0.5 translate-y-1 w-full min-h-[5rem] p-2 bg-white border rounded-md shadow-md">
            {loader}
            {(results.length === 0 || !results) && !loader ? <span className="w-full h-[4rem] flex justify-center items-center font_urbanist_medium text-xs">No Results Found :(</span> : null}
            {results.map((result, index) => {
                if (result.cover_image) return <Link key={index} onClick={() => setQuery('')} className={`${results.length === index + 1 ? null : "border-b"} w-full h-10 flex items-center font-urbanist text-xs capitalize`} href={`/products/product/${result._id}`}>
                    <span className="w-7 aspect-square rounded-md mr-2 overflow-hidden">
                        <Image src={process.env.NEXT_PUBLIC_BASE_IMG_URL + result.cover_image} width={50} height={50} alt='p img' className='w-full h-full object-cover' />
                    </span>
                    {result.name}
                </Link>
                else return <Link key={index} onClick={() => setQuery('')} className={`${results.length === index + 1 ? null : "border-b"} w-full h-10 flex items-center font-urbanist text-xs capitalize`} href={`/products/category/${result._id}?name=${result.name.toLowerCase()}`}>
                    <span className="w-7 mr-2">
                        <svg className='w-4 h-4 mx-auto' width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.566709 6.14375L0.566709 6.14375L0.567045 6.14441C0.612783 6.23422 0.65045 6.28362 0.687623 6.32028C0.725975 6.35809 0.782047 6.4003 0.885451 6.45568L0.972253 6.5H3.51431H6.05646L6.15624 6.4491L6.1569 6.44876C6.24686 6.40303 6.29634 6.36537 6.33304 6.32822C6.37087 6.28992 6.41309 6.23393 6.46849 6.13069L6.51273 6.0442V3.50481V0.965417L6.4685 0.878953C6.41309 0.77569 6.37088 0.719701 6.33304 0.681395C6.29634 0.64425 6.24686 0.606586 6.1569 0.560857L6.15624 0.56052L6.05567 0.509214L3.55707 0.500823C2.6733 0.498627 2.01112 0.500835 1.56001 0.507367C1.33391 0.510641 1.16456 0.514952 1.04826 0.520116C0.999508 0.522281 0.96343 0.524455 0.938169 0.526441C0.743945 0.610951 0.584784 0.787259 0.525972 0.959131C0.525145 0.97156 0.521384 1.01193 0.517665 1.09655C0.512561 1.21268 0.508381 1.37873 0.505381 1.60075C0.499394 2.04395 0.498274 2.69643 0.50267 3.59017C0.50267 3.59021 0.50267 3.59024 0.502671 3.59028L0.515261 6.04309L0.566709 6.14375ZM0.902272 0.530108C0.902414 0.530142 0.90474 0.529868 0.908821 0.529187C0.90417 0.529735 0.90213 0.530075 0.902272 0.530108Z" stroke="black" />
                            <path d="M10.0804 6.14375L10.0804 6.14375L10.0807 6.14441C10.1265 6.23422 10.1641 6.28362 10.2013 6.32028C10.2396 6.35809 10.2957 6.4003 10.3991 6.45568L10.4859 6.5H13.028H15.5701L15.6699 6.4491L15.6706 6.44876C15.7605 6.40303 15.81 6.36537 15.8467 6.32822C15.8845 6.28992 15.9268 6.23393 15.9822 6.13069L16.0264 6.0442V3.50481V0.965417L15.9822 0.878953C15.9268 0.77569 15.8845 0.719701 15.8467 0.681395C15.81 0.64425 15.7605 0.606586 15.6706 0.560857L15.6699 0.56052L15.5693 0.509214L13.0707 0.500823C12.187 0.498627 11.5248 0.500835 11.0737 0.507367C10.8476 0.510641 10.6782 0.514952 10.5619 0.520116C10.5132 0.522281 10.4771 0.524455 10.4518 0.526441C10.2576 0.610951 10.0985 0.787259 10.0396 0.959131C10.0388 0.97156 10.0351 1.01193 10.0313 1.09655C10.0262 1.21268 10.0221 1.37873 10.0191 1.60075C10.0131 2.04395 10.0119 2.69643 10.0163 3.59017C10.0163 3.59021 10.0163 3.59024 10.0163 3.59028L10.0289 6.04309L10.0804 6.14375ZM10.4159 0.530108C10.4161 0.530142 10.4184 0.529868 10.4225 0.529187C10.4178 0.529735 10.4158 0.530075 10.4159 0.530108Z" stroke="black" />
                            <path d="M0.566709 15.6437L0.566709 15.6437L0.567045 15.6444C0.612783 15.7342 0.65045 15.7836 0.687623 15.8203C0.725975 15.8581 0.782047 15.9003 0.885451 15.9557L0.972253 16H3.51431H6.05646L6.15624 15.9491L6.1569 15.9488C6.24686 15.903 6.29634 15.8654 6.33304 15.8282C6.37087 15.7899 6.41309 15.7339 6.46849 15.6307L6.51273 15.5442V13.0048V10.4654L6.4685 10.379C6.41309 10.2757 6.37088 10.2197 6.33304 10.1814C6.29634 10.1442 6.24686 10.1066 6.1569 10.0609L6.15624 10.0605L6.05567 10.0092L3.55707 10.0008C2.6733 9.99863 2.01112 10.0008 1.56001 10.0074C1.33391 10.0106 1.16456 10.015 1.04826 10.0201C0.999508 10.0223 0.96343 10.0245 0.938169 10.0264C0.743945 10.111 0.584784 10.2873 0.525972 10.4591C0.525145 10.4716 0.521384 10.5119 0.517665 10.5965C0.512561 10.7127 0.508381 10.8787 0.505381 11.1007C0.499394 11.5439 0.498274 12.1964 0.50267 13.0902C0.50267 13.0902 0.50267 13.0902 0.502671 13.0903L0.515261 15.5431L0.566709 15.6437ZM0.902272 10.0301C0.902414 10.0301 0.90474 10.0299 0.908821 10.0292C0.90417 10.0297 0.90213 10.0301 0.902272 10.0301Z" stroke="black" />
                            <path d="M10.0804 15.6437L10.0804 15.6437L10.0807 15.6444C10.1265 15.7342 10.1641 15.7836 10.2013 15.8203C10.2396 15.8581 10.2957 15.9003 10.3991 15.9557L10.4859 16H13.028H15.5701L15.6699 15.9491L15.6706 15.9488C15.7605 15.903 15.81 15.8654 15.8467 15.8282C15.8845 15.7899 15.9268 15.7339 15.9822 15.6307L16.0264 15.5442V13.0048V10.4654L15.9822 10.379C15.9268 10.2757 15.8845 10.2197 15.8467 10.1814C15.81 10.1442 15.7605 10.1066 15.6706 10.0609L15.6699 10.0605L15.5693 10.0092L13.0707 10.0008C12.187 9.99863 11.5248 10.0008 11.0737 10.0074C10.8476 10.0106 10.6782 10.015 10.5619 10.0201C10.5132 10.0223 10.4771 10.0245 10.4518 10.0264C10.2576 10.111 10.0985 10.2873 10.0396 10.4591C10.0388 10.4716 10.0351 10.5119 10.0313 10.5965C10.0262 10.7127 10.0221 10.8787 10.0191 11.1007C10.0131 11.5439 10.0119 12.1964 10.0163 13.0902C10.0163 13.0902 10.0163 13.0902 10.0163 13.0903L10.0289 15.5431L10.0804 15.6437ZM10.4159 10.0301C10.4161 10.0301 10.4184 10.0299 10.4225 10.0292C10.4178 10.0297 10.4158 10.0301 10.4159 10.0301Z" stroke="black" />
                        </svg>
                    </span>
                    {result.name}
                </Link>
            })}
        </div> : null}
    </div>
}