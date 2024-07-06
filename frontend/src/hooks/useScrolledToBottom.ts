import { useState, useEffect, RefObject } from "react";

function useScrolledToBottom(ref: RefObject<HTMLElement>): boolean {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = element;
            setIsScrolledToBottom(scrollTop + clientHeight >= scrollHeight);
        };

        // Attach the scroll event listener
        element.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        // Check on mount if the element is already scrolled to the bottom
        handleScroll();

        // Clean up the event listener on unmount
        return () => {
            element.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [ref]);

    return isScrolledToBottom;
}

export default useScrolledToBottom;