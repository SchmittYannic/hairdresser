import { useState, useRef, ChangeEvent, useCallback, useEffect } from "react";
import "./MultiRangeSlider.scss"

type MultiRangeSliderPropsType<T extends string | number> = {
    min: T;
    max: T;
    onChange: (values: { min: T, max: T }) => void;
    rangeValues?: T[] | readonly T[];
    step?: number;
};

const MultiRangeSlider = <T extends string | number>({
    min,
    max,
    onChange,
    rangeValues,
    step = 1
}: MultiRangeSliderPropsType<T>) => {
    if (rangeValues && rangeValues.length && (!rangeValues.includes(min) || !rangeValues.includes(max))) {
        throw Error("min and max need to be included inside rangeValues array");
    }

    const minRange = rangeValues && rangeValues.length !== 0 ? rangeValues.indexOf(min) : min;
    const maxRange = rangeValues && rangeValues.length !== 0 ? rangeValues.indexOf(max) : max;
    const stepRange = rangeValues && rangeValues.length !== 0 ? 1 : step;

    const [minVal, setMinVal] = useState<number>(+minRange);
    const [maxVal, setMaxVal] = useState<number>(+maxRange);
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    const displayMin = rangeValues && rangeValues.length !== 0 ? rangeValues[minVal] : minVal;
    const displayMax = rangeValues && rangeValues.length !== 0 ? rangeValues[maxVal] : maxVal;

    const handleMinValChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(+event.target.value, maxVal - 1);
        setMinVal(value);
    }

    const handleMaxValChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(+event.target.value, minVal + 1);
        setMaxVal(value);
    }

    const getPercent = useCallback(
        (value: number) => Math.round(((value - +minRange) / (+maxRange - +minRange)) * 100), [+minRange, +maxRange]
    );

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        onChange({ min: displayMin as T, max: displayMax as T })
    }, [minVal, maxVal]);

    return (
        <div className="multi-slider-container">
            <input
                className={`thumb${minVal > +maxRange - 100 ? " thumb--zindex-5" : " thumb--zindex-3"}`}
                ref={minValRef}
                type="range"
                min={minRange}
                max={maxRange}
                step={stepRange}
                value={minVal}
                onChange={handleMinValChange}
            />
            <input
                className="thumb thumb--zindex-4"
                ref={maxValRef}
                type="range"
                min={minRange}
                max={maxRange}
                step={stepRange}
                value={maxVal}
                onChange={handleMaxValChange}
            />
            <div className="slider">
                <div className="slider__track" />
                <div className="slider__range" ref={range} />
            </div>
        </div>
    )
}

export default MultiRangeSlider