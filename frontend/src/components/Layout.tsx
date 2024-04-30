import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { IoIosArrowUp } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa6";
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
                <div className="stickyEngagementWrapper top_right">
                    <Link
                        id="e7bok"
                        className="engagement sticky stickylink stickyLink hovereffect"
                        to={"/terminbuch/termine"}
                    >
                        <span className="stickyTitle">
                            Terminbuchung
                        </span>
                        <span className="icon-container stickyIcon">
                            <FaRegCalendarCheck aria-hidden />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Layout