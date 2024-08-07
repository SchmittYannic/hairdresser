import { useEffect } from "react";
import { offeredColorationServices, offeredCuttingServices, offeredShavingServices } from "src/constants";
import useServiceContext from "src/hooks/useServiceContext";
import useSessionContext from "src/hooks/useSessionContext";
import ServiceDialog from "src/features/booking/ServiceDialog";
import AsyncButton from "src/components/ui/AsyncButton";
import Bookdate from "src/features/booking/Bookdate";


const Services = () => {

    const {
        serviceInfo,
        resetServiceContext,
        triggerGetFreeSlots,
        isGetFreeSlotsError,
        isGetFreeSlotsLoading,
    } = useServiceContext();

    const { activeTab, setActiveTab } = useSessionContext();

    const handleBackButtonClicked = () => {
        setActiveTab("dashboard");
    };

    const handleNextButtonClicked = () => {
        triggerGetFreeSlots({
            employee: serviceInfo.employee_id,
            duration: serviceInfo.service_duration,
            service_name: serviceInfo.service_name,
        });
    };

    useEffect(() => {
        // reset Service and Appointment contexts when Services Component dismounts -> user leaves booking process
        return () => {
            resetServiceContext();
        }
    }, []);

    return (
        <>
            <div className={`servicesPage page${activeTab === "services" ? "" : " excluded"}`}>
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
                            {offeredCuttingServices.map((service) =>
                                <ServiceDialog
                                    key={service.service_id}
                                    service={service}
                                />
                            )}
                            <div className="list-item">
                                <span className="category">
                                    Bartpflege
                                </span>
                            </div>
                            {offeredShavingServices.map((service) =>
                                <ServiceDialog
                                    key={service.service_id}
                                    service={service}
                                />
                            )}
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
                        {offeredColorationServices.map((service) =>
                            <ServiceDialog
                                key={service.service_id}
                                service={service}
                            />
                        )}
                    </div>
                </div>
                <div className="clear-row"></div>
                <div className="col-1-1">
                    <span className="annotationLabel">
                        alle Preise inkl. Mwst. ,* mit Anzahlung
                    </span>
                </div>
                <div className="clear-row"></div>
                {
                    isGetFreeSlotsError &&
                    <div className="col-1-1">
                        <span className="error-msg" role="alert">
                            Etwas ist schiefgelaufen. Versuchen Sie es später erneut.
                        </span>
                    </div>
                }
                <div className="col-1-1">
                    <button
                        className="backButton bookingFormButton"
                        type="button"
                        onClick={handleBackButtonClicked}
                    >
                        <span>Zurück</span>
                    </button>
                    <AsyncButton
                        className="bookingFormButton"
                        type="button"
                        onClick={handleNextButtonClicked}
                        isLoading={isGetFreeSlotsLoading}
                        disabled={serviceInfo.service_name === "" || isGetFreeSlotsLoading}
                    >
                        Weiter
                    </AsyncButton>
                    <div className="clear-row"></div>
                </div>
            </div>
            {(activeTab === "bookdate" || activeTab === "confirmdate") && <Bookdate />}
        </>
    )
}

export default Services