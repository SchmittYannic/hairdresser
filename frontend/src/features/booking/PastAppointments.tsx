import useSessionContext from "../../hooks/useSessionContext"
import ArchivedAppointment from "./ArchivedAppointment";

const PastAppointments = () => {
    const { setActiveTab, archivedAppointments } = useSessionContext();

    const handleBackButtonClicked = () => {
        setActiveTab("dashboard");
    };

    return (
        <div className="page">
            <div className="col-1-1">
                <span className="captionLabel">
                    Ihre vergangenen Termine
                </span>
                <div className="appointmentList list">
                    {archivedAppointments.map((appointment) =>
                        <ArchivedAppointment
                            key={appointment._id}
                            appointment={appointment}
                        />
                    )}
                </div>
            </div>
            <div className="clear-row"></div>
            <div className="col-1-1">
                <button
                    className="backButton bookingFormButton"
                    type="button"
                    onClick={handleBackButtonClicked}
                >
                    <span>Zurück</span>
                </button>
                <div className="clear-row"></div>
            </div>
        </div>
    )
}

export default PastAppointments