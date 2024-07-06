import ImageSlider from "src/components/ImageSlider"
import useWindowSize from "src/hooks/useWindowSize"
import { salonpageSliderImgs1, salonpageSliderImgs2 } from "src/constants"
import { mirjamschmidsquare } from "src/assets"
import "src/features/companywebsite/Salonpage.scss"

const Salonpage = () => {

    const windowSize = useWindowSize();
    const isXlScreen = windowSize.width && windowSize.width > 1199 ? true : false;
    const isLgScreen = windowSize.width && windowSize.width > 767 ? true : false;
    const city = String(import.meta.env.VITE_CITY) ?? "Würzburg";
    const shopname = String(import.meta.env.VITE_SHOPNAME) ?? "hairdresser";

    return (
        <main id="salonpage" className="row designRow">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="r3322">
                        <ImageSlider
                            options={{
                                arrowbuttons: false,
                                dotbuttons: true,
                                autoDelay: 8000,
                            }}
                        >
                            {salonpageSliderImgs1.map((imgObj, idx) =>
                                <a
                                    className="image-slider-link"
                                    key={idx}
                                    target="_blank"
                                    href={imgObj.href}
                                    title={imgObj.title}
                                    tabIndex={-1}
                                >
                                    <img
                                        className="image-slider-img"
                                        src={imgObj.src}
                                        alt={imgObj.alt}
                                    />
                                </a>
                            )}
                        </ImageSlider>
                    </div>

                    <div id="r1391" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div id="m2496" className="module text">
                                    <h1 className="darkspottext text-center">
                                        Bilder sagen mehr als 1000 Worte!
                                    </h1>
                                </div>
                                <div className="module text">
                                    <p className="preamble text-center">
                                        <span className="bold">
                                            {shopname}
                                        </span>
                                        &nbsp;- Ihr Friseur in {city}
                                    </p>
                                </div>
                                <div id="m2395" className="module divider"></div>
                            </div>
                        </div>
                    </div>

                    <div id="r3020" className="row">
                        <div className="container container-fixed">
                            <div id="c2413" className="col col-md-6 col-lg-6 col-sm-12">
                                <a
                                    id="w_m3421"
                                    className="image-container"
                                    href="https://unsplash.com/de/fotos/frau-in-weiss-blau-kariertem-hemd-jzz_3jWMzHA"
                                    target="_blank"
                                    title="Foto von Rivage auf Unsplash"
                                >
                                    <img
                                        id="m3421"
                                        className="module image"
                                        src={mirjamschmidsquare}
                                        alt="Inhaberin Mirjam Schmid"
                                    />
                                </a>
                            </div>
                            <div id="c2336" className="col col-md-6 col-lg-6 col-sm-12">
                                <div id="m4563" className="module text">
                                    <h3 className="headline">
                                        Mirjam Schmid
                                    </h3>
                                </div>
                                <div id="m4992" className="module text">
                                    <p className="bodytext">
                                        <span className="bold">
                                            Inhaberin von {shopname}:
                                        </span>
                                    </p>
                                </div>
                                <div id="m1554" className="module text">
                                    <p>
                                        <span className="bold tertiary-color">
                                            "hairdresser ist nicht nur ein Wohlfühlort für Sie, es ist der Ort, an dem kreative,
                                        </span>
                                        <span className="bold tertiary-color">
                                            &nbsp;engagierte und temperamentvolle Hairstylisten Ihre Wünsche erfüllen und dabei Freude
                                        </span>
                                        <span className="bold tertiary-color">
                                            &nbsp;bereiten - für Groß und Klein. Sie sollen sich bei uns wohlfühlen. Dafür geben mein Team
                                        </span>
                                        <span className="bold tertiary-color">
                                            &nbsp;und ich alles. Machen Sie sich gerne selbst ein Bild."
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="r3522" className="row">
                        <div className="container w-full">
                            <div className="col col-sm-12">
                                <ImageSlider
                                    options={{
                                        amountperpage: isXlScreen ? 4 : 8,
                                        arrowbuttons: isXlScreen ? true : false,
                                        dotbuttons: false,
                                        columns: isLgScreen ? 4 : 2,
                                        rows: isXlScreen ? 1 : isLgScreen ? 2 : 4,
                                    }}
                                >
                                    {salonpageSliderImgs2.map((imgObj, idx) =>
                                        <a
                                            className="image-slider-link"
                                            key={idx}
                                            target="_blank"
                                            href={imgObj.href}
                                            title={imgObj.title}
                                            tabIndex={-1}
                                        >
                                            <img
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
        </main>
    )
}

export default Salonpage