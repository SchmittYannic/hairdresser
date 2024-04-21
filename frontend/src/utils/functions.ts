import { SliderImgsType } from "../components/ImageSlider";

const repeatArray = (num: number, arr: SliderImgsType[]): SliderImgsType[] => {
    const result: SliderImgsType[] = [];
    for (let i = 0; i < num; i++) {
        result.push(...arr);
    }
    return result;
}

const padArray = (num: number, arr: SliderImgsType[]): SliderImgsType[] => {
    const arrLength = arr.length;
    if (num > arrLength) throw Error("Error in padArray function: num cant be bigger than arrLength")
    const start = arr.slice(0, num);
    const end = arr.slice(arrLength - num, arrLength);
    console.log("arr: ", arr.length)
    console.log("start: ", start)
    console.log("end: ", end)
    const result: SliderImgsType[] = [...end, ...arr, ...start];

    return result
}

export {
    repeatArray,
    padArray,
}