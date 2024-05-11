
const Services = () => {
    return (
        <div className="servicesPage page">
            <div className="col-1-1">
                <span className="captionLabel">
                    Wählen Sie Ihre Dienstleistungen und den gewünschten Mitarbeiter
                </span>
            </div>
            <div className="col-2-1">
                <div className="servicesList">
                    <div className="list-item">
                        <span className="category">
                            Schneiden
                        </span>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Schneiden (ca. 30 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Kinderschnitt bis 6 Jahre (ca. 30 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Kinderschnitt von 7 bis 12 Jahre (ca. 30 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Teenagerschnitt von 12 bis 14 Jahre (ca. 30 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Cornrows (ca. 60 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                    </div>
                    <div className="list-item">
                        <span className="category">
                            Bartpflege
                        </span>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Cornrows (ca. 60 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                        <a href=""></a>
                    </div>
                </div>
            </div>
            <div className="col-2-2">
                <div className="servicesList">
                    <div className="list-item">
                        <span className="category">
                            Coloration / Dauerwelle
                        </span>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Greyblending (ca. 30 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                        <a href=""></a>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Dauerwelle (ca. 45 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="serviceContainer active">
                            <span className="serviceLabel">
                                Coloration (ca. 30 min.)
                            </span>
                            <span className="staffLabel excluded">

                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <span className="annotationLabel">
                    alle Preise inkl. Mwst. ,* mit Anzahlung
                </span>
            </div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                >
                    <span>Zurück</span>
                </button>
                <button
                    className="bookingFormButton"
                    type="button"
                    disabled={true}
                >
                    <span>Weiter</span>
                </button>
                <div className="clear-row"></div>
            </div>
        </div>
    )
}

export default Services