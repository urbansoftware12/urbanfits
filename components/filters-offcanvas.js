import React, { useEffect, useState } from "react";
import useWallet from "@/hooks/useWallet";
import Button from "./buttons/simple_btn";
import toaster from "@/utils/toast_function";

export default function FilterBar({ show, setFilterBar, array = [], minPrice = 0, maxPrice = 0, availableColors = [], availableSizes = [], onFilter }) {
    const { formatPriceNum, exchange_rate } = useWallet()

    const [min, setMin] = useState(formatPriceNum(minPrice))
    const [max, setMax] = useState(formatPriceNum(maxPrice))
    const [selectedColors, setSelectedColors] = useState([])
    const [selectedSizes, setSelectedSizes] = useState([])
    const closeFilterBar = (e) => { if (e.target.id === "filter_offcanvas") return setFilterBar(false) }

    const selectColor = ({ color_name }) => { if (selectedColors.includes(color_name?.toLowerCase())) return setSelectedColors(selectedColors.filter(c => c !== color_name.toLowerCase())); setSelectedColors(prevState => [...prevState, color_name.toLowerCase()]) }
    const selectSize = (size) => { if (selectedSizes.includes(size)) return setSelectedSizes(selectedSizes.filter(s => s !== size)); setSelectedSizes(prevState => [...prevState, size]) }
    const reverseConvertPrice = (price) => (price / exchange_rate).toFixed(3).replace(/\.?0+$/, '')
    // const appliedFilters = {
    //     priceFilters: Math.floor(min) !== Math.floor(formatPriceNum(minPrice)) || Math.floor(max) !== Math.floor(formatPriceNum(maxPrice)) ? true : false,
    //     colorFilters: selectedColors.length ? true : false,
    //     sizeFilters: selectedSizes.length ? true : false,
    // }
    const clearFilters = () => {
        setMin(formatPriceNum(minPrice))
        setMax(formatPriceNum(maxPrice))
        setSelectedColors([])
        setSelectedSizes([])
        onFilter({
            array,
            dropSpecificFilter: () => { }
        })
        setFilterBar(false)
    }
    const applyFilters = (Min = min, Max = max, SelectedColors = selectedColors, SelectedSizes = selectedSizes) => {
        if ((Min < 1)) return toaster("error", "Invalid price range.")
        const filteredByPrice = array.filter(product => product.price >= reverseConvertPrice(Min) && product.price <= reverseConvertPrice(Max))
        const filteredByColors = SelectedColors.length ? [] : filteredByPrice
        if (SelectedColors.length) filteredByPrice.forEach(product => {
            const matchedVariants = product.variants.filter(variant => SelectedColors.includes(variant.color_name.toLowerCase()))
            if (matchedVariants.length) filteredByColors.push(product)
        })
        const filteredBySizes = SelectedSizes.length ? [] : filteredByColors
        if (SelectedSizes.length) filteredByColors.forEach(product => {
            product.variants.forEach(variant => {
                const matchedSizes = variant.sizes.filter(sizeObj => SelectedSizes.includes(sizeObj.size))
                if (matchedSizes.length && !filteredBySizes.find(p => p._id === product._id)) filteredBySizes.push(product)
            })
        })

        onFilter({
            array: filteredBySizes,
            dropSpecificFilter
        })
        setFilterBar(false)
    }

    const dropSpecificFilter = (name) => {
        if (name === "price_filter") {
            setMin(formatPriceNum(minPrice))
            setMax(formatPriceNum(maxPrice))
            applyFilters(minPrice, maxPrice)
        }
        else if (name === "color_filter") {
            setSelectedColors([])
            applyFilters(min, max, [])
        }
        else if (name === "size_filter") {
            setSelectedSizes([])
            applyFilters(min, max, selectedColors, [])
        }
        setFilterBar(false)
    }

    useEffect(() => {
        onFilter({
            array: array,
            dropSpecificFilter
        })
        setMin(formatPriceNum(minPrice))
        setMax(formatPriceNum(maxPrice))
    }, [array])

    return <main id="filter_offcanvas" onClick={closeFilterBar} className={`${show ? null : "opacity-0 pointer-events-none"} fixed z-[200] inset-0 bg-gradient-to-br from-black/25 to-pink-600/25 w-full h-full transition-all duration-300`}>
        <section className={`w-full mid:w-1/2 lg:w-[30%] h-full ${show ? null : "-translate-x-full scale-75"} bg-white shadow-lg transition-all duration-300 overflow-x-clip overflow-y-scroll`}>

            <nav className="w-full p-4 mid:px-6 mid:py-3 flex justify-between items-center border-b">
                <h1 className="font_urbanist_bold text-xl lg:text-2xl">Filters</h1>
                <button onClick={() => setFilterBar(false)} className="fa-solid fa-xmark" />
            </nav>

            <section className="w-full p-4 md:p-6">
                <div className="w-full flex justify-between items-center">
                    <h2 className="font_urbanist_bold text-sm lg:text-base">Price range</h2>
                    {Math.floor(min) !== Math.floor(formatPriceNum(minPrice)) || Math.floor(max) !== Math.floor(formatPriceNum(maxPrice)) ? <button onClick={() => dropSpecificFilter("price_filter")} className="flex items-center text-10px lg:text-xs bg-red-500 text-white px-4 py-1.5 rounded-full gap-x-1.5"><i className="fa-solid fa-xmark" /> Drop Filter</button> : null}
                </div>
                <div className="w-full mt-4 flex justify-between items-center">
                    <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-24 px-4 py-1 font_urbanist_mdeium text-center text-sm hover:shadow-lg focus:bg-pinky focus:text-white outline-none border border-pinky rounded-full transition-all" />
                    -
                    <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-24 px-4 py-1 font_urbanist_mdeium text-center text-sm hover:shadow-lg focus:bg-pinky focus:text-white outline-none border border-pinky rounded-full transition-all" />
                </div>

                <div className="w-full mt-6 lg:mt-8 mb-4 flex justify-between items-center">
                    <h2 className="font_urbanist_bold text-sm lg:text-base">Color(s)</h2>
                    {selectedColors.length ? <button onClick={() => dropSpecificFilter("color_filter")} className="flex items-center text-10px lg:text-xs bg-red-500 text-white px-4 py-1.5 rounded-full gap-x-1.5"><i className="fa-solid fa-xmark" /> Drop Filter</button> : null}
                </div>
                <div className="w-full max-h-[20rem] p-2 border border-pinky rounded-xl overflow-y-scroll">
                    {availableColors.map((colorObj, index) => <button key={index} onClick={() => selectColor(colorObj)} className={`group w-full mb-1 flex justify-between items-center border-[0.5px] hover:bg-gray-100 ${selectedColors.find(c => c === colorObj.color_name.toLowerCase()) ? "bg-pinky text-white" : "text-black"} capitalize text-10px mid:text-xs p-2 rounded-lg transition-all`}>
                        {colorObj.color_name}
                        <i key={`$${index}-color`} style={{ background: colorObj.color }} className={`w-5 aspect-square flex justify-center items-center border-[0.5px] rounded-full transition-all`}>{selectedColors.find(c => c === colorObj.color_name.toLowerCase()) ? <i className={`fa-solid fa-check text-[8px] text-white`} /> : null}</i>
                    </button>)}
                </div>

                <div className="w-full mt-6 lg:mt-8 mb-4 flex justify-between items-center">
                    <h2 className="font_urbanist_bold text-sm lg:text-base">Size(s)</h2>
                    {selectedSizes.length ? <button onClick={() => dropSpecificFilter("size_filter")} className="flex items-center text-10px lg:text-xs bg-red-500 text-white px-4 py-1.5 rounded-full gap-x-1.5"><i className="fa-solid fa-xmark" /> Drop Filter</button> : null}
                </div>
                <div className="w-full max-h-[20rem] p-2 border border-pinky rounded-xl overflow-y-scroll">
                    {availableSizes.map((size, index) => <button onClick={() => selectSize(size)} className="w-full flex justify-between items-center px-4 py-2 rounded-xl hover:bg-gray-100 overflow-clip">
                        <span key={index} name={size} className={`w-7 aspect-square flex justify-center items-center font_urbanist_bold text-xs border-[0.5px] border-pinky rounded-full ${selectedSizes.includes(size) ? "text-white bg-pinky equillibrium_shadow" : "text-black"} transition-all`}>{size}</span>
                        {selectedSizes.includes(size) ? <i className="fa-solid fa-check text-10px text-pinky" /> : null}
                    </button>)}
                </div>

                <div className="w-full my-6 flex justify-between items-center gap-x-3">
                    <Button onClick={clearFilters} bg="bg-gray-100" text="black" my="0" classes="w-1/2" font='font_urbanist_medium'>Clear
                        <span className="w-4 aspect-square material-symbols-outlined mr-2 hover:shadow-md">
                            <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                <path d="M6.3225 6.3225L44.2575 44.2575" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.9675 10.5375H38.9887C39.2923 10.6439 39.5674 10.8185 39.793 11.0476C40.0187 11.2768 40.1889 11.5547 40.2906 11.8598C40.3923 12.1649 40.4229 12.4893 40.3798 12.808C40.3368 13.1268 40.2214 13.4315 40.0425 13.6987L31.5092 23.0856M29.505 29.505V40.0425L21.075 33.72V25.29L10.5375 13.6987C10.2503 13.2702 10.1303 12.7511 10.2002 12.2399C10.2701 11.7288 10.5251 11.261 10.9168 10.9253" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </Button>
                    <Button onClick={() => applyFilters(min, max, selectedColors, selectedSizes)} my="0" classes="w-1/2">Apply Filters</Button>
                </div>
            </section>
        </section>
    </main >
}