import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom"
import { IoIosArrowUp } from "react-icons/io";
import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {

    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    const handleButtonClicked = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="container w-full">
            <div className="col col-sm-12">
                <Header />
                <div ref={ref}></div>
                <Outlet />
                <Footer />
                <button
                    className={`scrollIcon bottom_right${isInView ? " hidden" : " visible"}`}
                    type="button"
                    onClick={handleButtonClicked}
                    aria-label="Zu Seitenanfang scrollen"
                >
                    <span>
                        <IoIosArrowUp aria-hidden />
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Layout