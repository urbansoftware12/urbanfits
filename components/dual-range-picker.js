import React, { useCallback, useEffect, useState, useRef } from "react";
import ranger from "@/styles/range-picker.module.css"

export default function DualRangePicker({ min, max, onChange }) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(null);
    const maxValRef = useRef(null);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        if (onChange) onChange({ min: minVal, max: maxVal });
    }, [minVal, maxVal, onChange]);

    return <div className="w-full flex justify-center items-center">
        <input type="range" min={min} max={max} value={minVal} ref={minValRef} onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
        }} className={minVal > max - 10 ? ranger.thumb__zindex_5 : `${ranger.thumb} ${ranger.thumb__zindex_3}`}
        />
        <input type="range" min={min} max={max} value={maxVal} ref={maxValRef} onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
        }} className={`${ranger.thumb} ${ranger.thumb__zindex_4}`}
        />

        <div className="relative w-4/5 flex justify-center items-center">
            <span className={ranger.slider__track} />
            <span ref={range} className={ranger.slider__range} />
            <span className={ranger.slider__left_value}>{minVal}</span>
            <span className={ranger.slider__right_value}>{maxVal}</span>
        </div>
    </div>
};