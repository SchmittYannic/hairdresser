import { MouseEvent, useEffect } from "react";
import useSessionContext from "../../hooks/useSessionContext"
import EditUser from "./EditUser";
import Services from "./Services";
import Appointment from "./Appointment";
import ArchivedAppointment from "./ArchivedAppointment";
import ClipLoader from "../../components/ui/ClipLoader";
import PastAppointments from "./PastAppointments";

const Dashboard = () => {

    const {
        userInfo,
        activeTab,
        setActiveTab,
        nextAppointment,
        isNextAppointmentLoading,
        isNextAppointmentError,
        isNextAppointmentSuccess,
        refetchNextAppointment,
        archivedAppointments,
        isArchivedAppointmentsLoading,
        isArchivedAppointmentsError,
        isArchivedAppointmentsSuccess,
        refetchArchivedAppointments,
    } = useSessionContext();

    const isAppointmentBooking = (activeTab === "services" || activeTab === "bookdate" || activeTab === "confirmdate");

    const limitArchivedAppointments = archivedAppointments.length >= 3 ? archivedAppointments.slice(0, 3) : archivedAppointments;

    const handleEditUserClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveTab("editUser");
    };

    const handlePastAppointmentsClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveTab("pastappointments");
    }

    useEffect(() => {
        refetchNextAppointment();
        refetchArchivedAppointments();
    }, []);

    return (
        <>
            <div
                className={`appointmentPage page${activeTab !== "dashboard" ? " excluded" : ""}`}
            >
                <div className="customerContainer col-1-1">
                    <div className="infoContainer">
                        <span className="captionLabel">
                            Hallo {userInfo.firstname} {userInfo.lastname}
                        </span>
                        <span className="infoLabel">
                            hier können Sie Ihre nächsten Termine einsehen und neue Termine buchen.
                        </span>
                    </div>
                    <span className="contactLabel">
                        <b>Benachrichtigungen & Kontaktdaten</b>
                        <br />
                        <a
                            href=""
                            onClick={handleEditUserClicked}
                        >
                            Hier verwalten
                        </a>
                        <br />
                        Email: {userInfo.email}
                        <br />
                        Handynr.: {userInfo.phonenumber}
                    </span>
                </div>
                <div className="col-2-1">
                    <div className="currentAppointmentsContainer">
                        <span className="captionLabel">
                            Ihre nächsten Termine
                        </span>
                        {
                            isNextAppointmentLoading &&
                            <div className="dashboardCliploader">
                                <ClipLoader
                                    loading={isArchivedAppointmentsLoading}
                                    color="rgb(209,213,219)"
                                    size={30}
                                />
                            </div>
                        }
                        {
                            isNextAppointmentSuccess && nextAppointment.length !== 0 &&
                            <span className={`appointmentList`}>
                                {nextAppointment.map((appointment) =>
                                    <Appointment
                                        key={appointment._id}
                                        appointment={appointment}
                                    />
                                )}
                            </span>
                        }
                        {
                            isNextAppointmentSuccess && nextAppointment.length === 0 &&
                            <span className="noAppointmentsLabel">
                                - keine gebuchten Termine -
                            </span>
                        }
                        {
                            isNextAppointmentError &&
                            <span className="error-msg" role="alert">
                                Fehler bei Abfrage nach Terminen.
                            </span>
                        }
                    </div>
                    <div className="newAppointmentContainer">
                        <span className="captionLabel">
                            Neuen Termin buchen
                        </span>
                        <span className="infoLabel">
                            Buchen Sie hier Ihren nächsten Termin.
                        </span>
                        <div className="buttonRow">
                            <button
                                className="bookingFormButton"
                                type="button"
                                onClick={() => setActiveTab("services")}
                            >
                                <span>Neuer Termin</span>
                            </button>
                            <div className="clear-row"></div>
                        </div>
                        {/* <span className="infoLabel">
                            Sie können auch einen Termin für eine andere Person (Partner, Kinder, Angehörige) buchen.
                        </span>
                        <div className="buttonRow">
                            <button
                                className="bookingFormButton"
                                type="button"
                            >
                                <span>Andere Person</span>
                            </button>
                            <div className="clear-row"></div>
                        </div> */}
                    </div>
                </div>
                <div className="col-2-2">
                    <div className="pastAppointmentsContainer ">
                        <span className="captionLabel">
                            Ihre vergangenen Termine
                        </span>
                        {
                            isArchivedAppointmentsLoading &&
                            <div className="dashboardCliploader">
                                <ClipLoader
                                    loading={isArchivedAppointmentsLoading}
                                    color="rgb(209,213,219)"
                                    size={30}
                                />
                            </div>
                        }
                        {
                            isArchivedAppointmentsSuccess && limitArchivedAppointments.length !== 0 &&
                            <>
                                <span className={`archivedAppointmentList list`}>
                                    {limitArchivedAppointments.map((appointment) =>
                                        <ArchivedAppointment
                                            key={appointment._id}
                                            appointment={appointment}
                                        />
                                    )}
                                </span>
                                <div className="historyContainer">
                                    <a
                                        href=""
                                        onClick={handlePastAppointmentsClicked}
                                    >
                                        weitere anzeigen...
                                    </a>
                                </div>
                            </>
                        }
                        {
                            isArchivedAppointmentsSuccess && limitArchivedAppointments.length === 0 &&
                            <span className="noAppointmentsLabel">
                                - keine archivierten Termine -
                            </span>
                        }
                        {
                            isArchivedAppointmentsError &&
                            <span className="error-msg" role="alert">
                                Fehler bei Abfrage nach archivierten Terminen.
                            </span>
                        }
                    </div>
                </div>
                <div className="clear-row"></div>
            </div>
            {activeTab === "editUser" && <EditUser />}
            {activeTab === "pastappointments" && <PastAppointments />}
            {isAppointmentBooking && <Services />}
        </>
    )
}

export default Dashboard