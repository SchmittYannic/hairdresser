import { FaInstagram } from "react-icons/fa"
import useWindowSize from "src/hooks/useWindowSize"
import ImageSlider from "src/components/ImageSlider"
import ImageComponent from "src/components/ui/ImageComponent"
import { vorhernachher, showpony } from "src/assets"
import { stylingpageSliderImgs, stylingpageSliderImgs2 } from "src/constants"
import "src/features/companywebsite/Stylingpage.scss"

const Stylingpage = () => {

    const windowSize = useWindowSize();
    const isLgScreen = windowSize.width && windowSize.width > 767 ? true : false;
    const shopname = String(import.meta.env.VITE_SHOPNAME) ?? "hairdresser";

    return (
        <main id="stylingpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="images-section-stylingpage" className="row">
                        <div className="container w-full">
                            <div id="c5385" className="col col-sm-12">
                                <ImageSlider
                                    options={{
                                        amountperpage: isLgScreen ? 3 : 1,
                                        arrowbuttons: isLgScreen ? false : true,
                                        dotbuttons: false,
                                    }}
                                >
                                    {stylingpageSliderImgs.map((imgObj, idx) =>
                                        <a
                                            className="image-slider-link"
                                            key={idx}
                                            target="_blank"
                                            href={imgObj.href}
                                            title={imgObj.title}
                                            tabIndex={-1}
                                        >
                                            <ImageComponent
                                                className="image-slider-img"
                                                src={imgObj.src}
                                                alt={imgObj.alt}
                                            />
                                        </a>
                                    )}
                                </ImageSlider>
                            </div>
                        </div>
                    </div>

                    <div id="r1427" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div id="m2362" className="module text">
                                    <h1 className="darkspottext text-center">
                                        Styling bei {shopname}
                                    </h1>
                                </div>
                                <div className="module text">
                                    <h2 className="preamble text-center">
                                        <span className="bold">
                                            Man wird sich nach Ihnen umdrehen!
                                        </span>
                                    </h2>
                                </div>
                                <div id="m2618" className="module divider"></div>
                                <div className="module text">
                                    <p className="text-center">
                                        <span className="bold">
                                            Ob kurz oder lang, lockig oder glatt -&nbsp;
                                        </span>
                                        wir zaubern Ihre Traumfrisur.
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                    <p className="text-center">
                                        Sie stehen bei uns im Mittelpunkt. In unserer professionellen Typberatung besprechen wir Ihre Vorstellungen und Wünsche. Unseren Friseursalon verlassen Sie erst, wenn wir Sie glücklich gemacht haben.
                                    </p>
                                    <p className="text-center">&nbsp;</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="instagram-section-stylingpage" className="row">
                        <div className="container w-full">
                            <a
                                id="instagramImg-stylingpage"
                                className="col col-md-6 col-lg-6 col-sm-12"
                                href="https://www.freepik.com/free-photo/hairdresser-using-electric-trimmer-cutting-client39s-hair_27258635.htm#fromView=search&page=1&position=14&uuid=c0e9aa56-ca74-497d-a564-6d42eedc1330"
                                target="_blank"
                                title="Image by freepik"
                            ></a>
                            <div
                                id="instagramText-stylingpage"
                                className="col col-md-6 col-lg-6 col-sm-12"
                            >
                                <div className="module text">
                                    <h2 className="headline">
                                        Frisuren
                                    </h2>
                                </div>
                                <div id="m1640" className="module text">
                                    <p>
                                        Klicken Sie sich doch gerne schon mal durch unsere&nbsp;
                                        <span className="bold">Instagram-Profil.</span>
                                        &nbsp;Vielleicht erscheint auch bald Ihr Bild hier, wenn wir Sie happy gemacht haben.
                                    </p>
                                    <p className="bodytext">&nbsp;</p>
                                    <p className="bodytext">
                                        <strong>
                                            Überzeugen Sie sich von unserem Können!
                                        </strong>
                                    </p>
                                </div>
                                <a
                                    id="m2929"
                                    className="module button"
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    title="Instagramprofil öffnen"
                                >
                                    <span className="icon-container">
                                        <FaInstagram aria-hidden />
                                    </span>
                                    &nbsp;
                                    <span>
                                        Zum Instagram-Profil
                                    </span>
                                </a>
                                <img
                                    id="vorhernachherImg"
                                    className="module image"
                                    src={vorhernachher}
                                    alt="vorhernachher"
                                />
                            </div>
                        </div>
                    </div>

                    <div id="r4619" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div className="module text">
                                    <h2 className="headline text-left">
                                        Unsere Produkte - Pflegen und Stylen
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="r1792" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12 col-lg-12 col-md-12 flexCol">
                                <div className="flexWrap">
                                    <div className="module text">
                                        <h3 className="subtitle">
                                            <span className="tertiary-color">
                                                Willkommen in einer Welt der unbegrenzten Möglichkeiten
                                            </span>
                                        </h3>
                                        <h3 className="subtitle">Showpony</h3>
                                    </div>
                                    <div id="m3295" className="module text">
                                        <p>
                                            Showpony die neue Dimension der Haarverlängerung oder Verdichtung , die sich nahtlos und unsichtbar in das natürliche Haar einfügt.
                                            <br />
                                            Die Skin Weft Tape Collection ist die unauffälligste Form der Haarverlängerung auf dem Markt.
                                            <br />
                                            &nbsp;
                                            <br />
                                            Wir zeigen Ihnen gerne die unbegrenzten Möglichkeiten und kreieren Ihnen das Haar, von dem Sie immer geträumt haben.
                                        </p>
                                    </div>
                                </div>
                                <div className="module autospacer"></div>
                                <div className="flexWrap">
                                    <img
                                        id="m2533"
                                        className="module image"
                                        src={showpony}
                                        alt="Showpony"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="r4888" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12 col-lg-12 col-md-12 flexCol">
                                <div className="flexWrap">
                                    <div className="module text">
                                        <h3 className="subtitle">
                                            <span className="tertiary-color">
                                                Die Faszination schöner Haare
                                            </span>
                                        </h3>
                                        <h3 className="subtitle">
                                            KEVIN.MURPHY
                                        </h3>
                                    </div>
                                    <div id="m3235" className="module text">
                                        <p>
                                            Für gesunde, glänzende Haare und ein gelungenes Styling setzen wir auf die Produktlinien von KEVIN.MURPHY, die perfekt auf die Bedürfnisse der unterschiedlichen Haartypen abgestimmt sind. Die passende Pflege erleichtert das Stylen um ein Vielfaches.
                                        </p>
                                        <p>&nbsp;</p>
                                        <p>
                                            Wussten Sie, dass KEVIN.MURPHY von PETA in die Positiv-Liste der Kosmetikhersteller aufgenommen, da ihre Produkte tierversuchsfrei hergestellt werden? Das ist uns wichtig.
                                        </p>
                                    </div>
                                </div>
                                <div className="module autospacer"></div>
                                <div className="flexWrap">
                                    <ImageSlider
                                        options={{
                                            amountperpage: isLgScreen ? 3 : 1,
                                            arrowbuttons: isLgScreen ? false : true,
                                            dotbuttons: false,
                                        }}
                                    >
                                        {stylingpageSliderImgs2.map((imgObj, idx) =>
                                            <a
                                                className="image-slider-link"
                                                key={idx}
                                                target="_blank"
                                                href={imgObj.href}
                                                title={imgObj.title}
                                                tabIndex={-1}
                                            >
                                                <ImageComponent
                                                    className="image-slider-img"
                                                    src={imgObj.src}
                                                    alt={imgObj.alt}
                                                />
                                            </a>
                                        )}
                                    </ImageSlider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Stylingpage