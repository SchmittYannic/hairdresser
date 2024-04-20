import { useState } from "react"
import { Link } from "react-router-dom"
import { FaPhone } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa"
import { FaFacebookF } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { TfiMenu } from "react-icons/tfi";
import logo from "../assets/logo.png"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClicked = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header>
            <div id="page-header" className="row">
                <div className="container w-full">
                    <div id="header-left" className="col col-sm-5 col-lg-3 col-md-5 flexCol">
                        <div className="module autospacer"></div>
                        <div className="flexWrap">
                            <Link to={"/"}>
                                <img 
                                    id="header-logo"
                                    className="module image"
                                    src={logo}
                                    alt=""
                                />
                            </Link>
                        </div>
                        <div className="module autospacer"></div>
                    </div>
                    <div id="header-right" className="col col-sm-7 col-lg-9 col-md-7 flexCol">
                        <div className="flexWrap">
                            <div id="telephone-info" className="module text">
                                <p className="bodytext" style={{textAlign: "right"}}>
                                    <span style={{fontWeight: "bold"}}>
                                        Vereinbaren Sie einen Termin:&nbsp;
                                        <span style={{color: "rgba(105, 105, 105, 0.8)",}}>                               
                                            <FaPhone />                                         
                                        </span>
                                        &nbsp;
                                        <span style={{color: "#696969"}}>
                                            <a href="tel:000000000">
                                                <span className="monoglobalWrap">
                                                    00000 0000
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
                                        <a href="https://www.instagram.com" target="_blank">
                                            <FaInstagram />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com" target="_blank">
                                            <FaFacebookF />
                                        </a>
                                    </li>
                                </ul>

                                <nav id="main-navigation" className="module nav">
                                    <button
                                        className="menuBtn"
                                        type="button"
                                        onClick={handleMenuClicked}
                                    >
                                        {isMenuOpen ? <MdClose /> : <TfiMenu />}
                                    </button>
                                    <ul className={`navContainer ${isMenuOpen ? "open" : ""}`}>
                                        <li className="active">
                                            <Link to={"/"}>Willkommen</Link>   
                                        </li>
                                        <li>
                                            <Link to={"/"}>Terminbuchung</Link>
                                        </li>
                                        <li>
                                            <Link to={"/"}>Styling</Link>
                                        </li>
                                        <li>
                                            <Link to={"/"}>Colour</Link>
                                        </li>
                                        <li>
                                            <Link to={"/"}>Salon</Link>
                                        </li>
                                        <li>
                                            <Link to={"/"}>Team</Link>
                                        </li>
                                        <li>
                                            <Link to={"/"}>Jobs</Link>
                                        </li>
                                        <li>
                                            <Link to={"/"}>Kontakt</Link>
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