import { arrayChildrenType } from "../components/ImageSlider";

const splitArray = (array: arrayChildrenType[], number: number): arrayChildrenType[][] => {
    const arrLength = array.length;

    if (!arrLength) throw Error("Error in splitArray function: arrLength cant be null or undefined")
    if (arrLength % number !== 0) throw Error("Error in splitArray function: arrLength must be evenly divisible by number without leaving a remainder")

    const result = [];
    for (let i = 0; i < array.length; i += number) {
        result.push(array.slice(i, i + number));
    }
    return result;
}

const repeatArray = (array: arrayChildrenType[], number: number): arrayChildrenType[] => {
    const result: arrayChildrenType[] = [];
    for (let i = 0; i < number; i++) {
        result.push(...array);
    }
    return result;
}

const padArray = (array: arrayChildrenType[], number: number): arrayChildrenType[] => {
    const arrLength = array.length;
    if (number > arrLength) throw Error("Error in padArray function: num cant be bigger than arrLength")
    const start = array.slice(0, number);
    const end = array.slice(arrLength - number, arrLength);
    const result: arrayChildrenType[] = [...end, ...array, ...start];
    return result
}

const insertSpace = (string: string) => {
    if (typeof string !== "string" || string.length <= 5) {
        return string; // return the string as is if it's not a string or its length is 5 or less
    }

    return string.slice(0, 5) + " " + string.slice(5);
}

export {
    splitArray,
    repeatArray,
    padArray,
    insertSpace,
}