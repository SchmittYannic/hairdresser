import { MouseEvent } from "react";
import useSessionContext from "../../hooks/useSessionContext"
import { activeTabType } from "./Booking";

type DashboardPropsType = {
    activeTab: activeTabType,
    callback: React.Dispatch<React.SetStateAction<activeTabType>>
}

const Dashboard = ({ activeTab, callback }: DashboardPropsType) => {

    const { userInfo } = useSessionContext();

    const handleEditUserClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        callback("editUser");
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
                        <span className={`appointmentList list excluded`}>

                        </span>
                        <span className="noAppointmentsLabel">
                            - keine gebuchten Termine -
                        </span>
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

                </div>
                <div className="clear-row"></div>
            </div>
        </>
    )
}

export default Dashboard