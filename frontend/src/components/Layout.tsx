import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { IoIosArrowUp } from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
//import useSessionContext from "src/hooks/useSessionContext";
import Header from "./Header"
import Footer from "./Footer"
//import CookieConsent from "src/components/CookieConsent";
import "../index.scss"

const Layout = () => {

    //const { isCookieConsent } = useSessionContext();
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);
    const [modalAnimation, setModalAnimation] = useState<"bounceInDown" | "bounceOutUp">("bounceInDown");

    const handleButtonClicked = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    const handleModalCloseClicked = () => {
        setModalAnimation("bounceOutUp");
        setTimeout(() => {
            setIsModalVisible(false);
        }, 1000);
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

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         handleModalCloseClicked();
    //     }, 10000);

    //     return () => clearTimeout(timeout)
    // }, [handleModalCloseClicked]);

    return (
        <div className="container w-full">
            <div className="col col-sm-12">
                <Header />
                <div ref={ref}></div>
                <Outlet />
                <Footer />
                {/* {!isCookieConsent && <CookieConsent />} */}
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

                <div
                    className={`engagement simpleinfomercial modal animated ${modalAnimation}`}
                    style={{ display: isModalVisible ? "block" : "none" }}
                >
                    <button
                        className="closeBtn"
                        type="button"
                        onClick={handleModalCloseClicked}
                        title="Modal schließen"
                    >
                        <MdClose aria-hidden />
                    </button>
                    <div className="content">
                        <h2 className="headline">
                            Demo Applikation
                        </h2>
                        <div className="bodytext">
                            <p>

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout