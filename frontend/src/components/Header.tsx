import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { FaPhone } from "react-icons/fa6"
import { FaInstagram, FaFacebookF } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { TfiMenu } from "react-icons/tfi"
import { insertSpace } from "../utils/functions"
import logo from "../assets/logo.png"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const phonenumber = String(import.meta.env.VITE_PHONENUMBER) ?? "000000000";
    const instagram = String(import.meta.env.VITE_INSTAGRAM) ?? "https://www.instagram.com";
    const facebook = String(import.meta.env.VITE_FACEBOOK) ?? "https://www.facebook.com";

    const handleMenuClicked = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header>
            <div id="page-header" className="row">
                <div className="container w-full">
                    <div id="header-left" className="col col-sm-5 col-lg-3 col-md-5 flexCol">
                        <div className="module autospacer"></div>
                        <div className="flexWrap">
                            <Link
                                to={"/"}
                                title="Startseite"
                            >
                                <img
                                    id="header-logo"
                                    className="module image"
                                    src={logo}
                                    alt="hairdresser logo"
                                />
                            </Link>
                        </div>
                        <div className="module autospacer"></div>
                    </div>
                    <div id="header-right" className="col col-sm-7 col-lg-9 col-md-7 flexCol">
                        <div className="flexWrap">
                            <div id="telephone-info" className="module text">
                                <p className="bodytext text-right">
                                    <span className="bold">
                                        Vereinbaren Sie einen Termin:&nbsp;
                                        <span className="secondary-color">
                                            <FaPhone aria-hidden />
                                        </span>
                                        &nbsp;
                                        <span className="secondary-color">
                                            <a href={`tel:${phonenumber}`}>
                                                <span className="monoglobalWrap">
                                                    {insertSpace(phonenumber)}
                                                </span>
                                            </a>
                                        </span>
                                    </span>
                                </p>
                            </div>

                            <div className="module autospacer"></div>

                            <div className="flexWrap">
                                <ul id="social-icons" className="module iconlist">
                                    <li>
                                        <a
                                            href={instagram}
                                            target="_blank"
                                            title="Instagramprofil öffnen"
                                        >
                                            <FaInstagram aria-hidden />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={facebook}
                                            target="_blank"
                                            title="Facebookprofil öffnen"
                                        >
                                            <FaFacebookF aria-hidden />
                                        </a>
                                    </li>
                                </ul>

                                <nav id="main-navigation" className="module nav">
                                    <button
                                        className="menuBtn"
                                        type="button"
                                        onClick={handleMenuClicked}
                                        title={`${isMenuOpen ? "Navigation schließen" : "Navigation öffnen"}`}
                                    >
                                        {isMenuOpen ? <MdClose aria-hidden /> : <TfiMenu aria-hidden />}
                                    </button>
                                    <ul className={`navContainer ${isMenuOpen ? "open" : ""}`}>
                                        <li>
                                            <NavLink
                                                to={"/"}
                                                onClick={closeMenu}
                                            >
                                                Willkommen
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/terminbuchung"}
                                                onClick={closeMenu}
                                            >
                                                Terminbuchung
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/styling"}
                                                onClick={closeMenu}
                                            >
                                                Styling
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/colour"}
                                                onClick={closeMenu}
                                            >
                                                Colour
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/salon"}
                                                onClick={closeMenu}
                                            >
                                                Salon
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/team"}
                                                onClick={closeMenu}
                                            >
                                                Team
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/jobs"}
                                                onClick={closeMenu}
                                            >
                                                Jobs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={"/kontakt"}
                                                onClick={closeMenu}
                                            >
                                                Kontakt
                                            </NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header