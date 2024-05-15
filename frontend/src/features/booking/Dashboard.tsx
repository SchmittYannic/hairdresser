import { MouseEvent } from "react";
import useSessionContext from "../../hooks/useSessionContext"
import EditUser from "./EditUser";
import Services from "./Services";
import Appointment from "./Appointment";
import ArchivedAppointment from "./ArchivedAppointment";

const Dashboard = () => {

    const { userInfo, activeTab, setActiveTab, nextAppointment } = useSessionContext();

    const isAppointmentBooking = (activeTab === "services" || activeTab === "bookdate" || activeTab === "confirmdate");

    const handleEditUserClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveTab("editUser");
    }

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
                        <span className={`appointmentList${nextAppointment.length === 0 ? " exluded" : ""}`}>
                            {nextAppointment.map((appointment) =>
                                <Appointment
                                    key={appointment._id}
                                    appointment={appointment}
                                />
                            )}
                        </span>
                        {
                            nextAppointment.length === 0 &&
                            <span className="noAppointmentsLabel">
                                - keine gebuchten Termine -
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
                        <span className="infoLabel">
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
                        </div>
                    </div>
                </div>
                <div className="col-2-2">
                    <div className="pastAppointmentsContainer ">
                        <span className="captionLabel">
                            Ihre vergangenen Termine
                        </span>
                        <span className={`archivedAppointmentList list${nextAppointment.length === 0 ? " exluded" : ""}`}>
                            {nextAppointment.map((appointment) =>
                                <ArchivedAppointment
                                    key={appointment._id}
                                    appointment={appointment}
                                />
                            )}
                        </span>
                        <div className="historyContainer">
                            <a href="">
                                weitere anzeigen...
                            </a>
                        </div>
                    </div>
                </div>
                <div className="clear-row"></div>
            </div>
            {activeTab === "editUser" && <EditUser />}
            {isAppointmentBooking && <Services />}
        </>
    )
}

export default Dashboard