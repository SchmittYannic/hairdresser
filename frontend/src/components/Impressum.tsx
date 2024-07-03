import "./Impressum.scss"

const Impressum = () => {

    const firstname = String(import.meta.env.VITE_IMPRESSUM_FIRSTNAME) ?? "";
    const lastname = String(import.meta.env.VITE_IMPRESSUM_LASTNAME) ?? "";
    const street = String(import.meta.env.VITE_IMPRESSUM_STREET) ?? "";
    const plz = String(import.meta.env.VITE_IMPRESSUM_PLZ) ?? "";
    const city = String(import.meta.env.VITE_IMPRESSUM_CITY) ?? "";
    const email = String(import.meta.env.VITE_IMPRESSUM_EMAIL) ?? "";

    return (
        <main id="impressumpage" className="row">
            <div className="container w-full">
                <div className="col col-sm-12">
                    <div id="r4928" className="row">
                        <div className="container container-fixed">
                            <div className="col col-sm-12">
                                <div className="module text">
                                    <h1 className="headline">
                                        Impressum
                                    </h1>
                                </div>
                                <div className="module text" style={{ marginTop: "30px" }}>
                                    <p className="bodytext" style={{ fontWeight: "bold" }}>
                                        {firstname} {lastname}
                                    </p>
                                    <p className="bodytext">
                                        {street}
                                    </p>
                                    <p className="bodytext">
                                        {plz} {city}
                                    </p>
                                    <p className="bodytext">
                                        <br />
                                    </p>
                                    <p className="bodytext">
                                        Email:&nbsp;
                                        <a href={`mailto:${email}`}>
                                            {email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Impressum