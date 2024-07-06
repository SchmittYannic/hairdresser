import { useState, MouseEvent } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import useServiceContext from "src/hooks/useServiceContext";
import useAppointmentContext from "src/hooks/useAppointmentContext";
import Dialog from "src/components/ui/Dialog"
import { staffarbitrary } from "src/assets";
import { EmployeeType, OfferedServiceType } from "src/utils/types";
import { employees } from "src/constants";

type ServiceDialogPropsType = {
    service: OfferedServiceType,
}

const ServiceDialog = ({ service }: ServiceDialogPropsType) => {

    const {
        serviceInfo,
        setServiceInfo,
        resetServiceContext,
    } = useServiceContext();

    const {
        resetAppointmentContext,
    } = useAppointmentContext();

    const [isOpen, setIsOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const handleServiceClicked = () => {
        resetAppointmentContext(); //reset appointment in case user went back to step 1 and selected new option

        if (serviceInfo.service_name === service.service_name) {
            resetServiceContext(); // reset ServiceContext when service deselected
        } else {
            setIsOpen(true);
        }
    }

    const handleEmployeeClicked = (e: MouseEvent, employee: EmployeeType | null) => {
        e.stopPropagation();
        setServiceInfo((prev) => {
            const newState = { ...prev }
            newState["service_name"] = service.service_name
            newState["service_duration"] = service.service_duration
            if (employee) {
                newState["employee_id"] = employee.id
                newState["employee_firstname"] = employee.firstname
                newState["employee_lastname"] = employee.lastname
            } else {
                newState["employee_id"] = ""
                newState["employee_firstname"] = ""
                newState["employee_lastname"] = ""
            }
            return newState
        });
        setIsOpen(false);
    }

    const handleInfoClicked = (e: MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
        e.preventDefault();
        setIsInfoOpen(true);
    }

    return (
        <>
            <div className="list-item">
                <div
                    className={`serviceContainer active${serviceInfo.service_name === service.service_name ? " selected" : ""}`}
                    onClick={handleServiceClicked}
                >
                    {
                        serviceInfo.service_name === service.service_name &&
                        <span className="icon-container checkmark">
                            <ImCheckmark aria-hidden />
                        </span>
                    }
                    <span className="serviceLabel">
                        {service.service_label}
                    </span>
                    {
                        serviceInfo.employee_id &&
                        <span className={`staffLabel${serviceInfo.service_name !== service.service_name ? " excluded" : ""}`}>
                            - {serviceInfo.employee_firstname} {serviceInfo.employee_lastname}
                        </span>
                    }
                </div>
                {
                    service.service_info &&
                    <>
                        <a
                            className="infoLink"
                            href=""
                            onClick={handleInfoClicked}
                        >
                            <span className="icon-container">
                                <FaInfoCircle aria-hidden />
                            </span>
                        </a>
                        {
                            isInfoOpen &&
                            <Dialog setDialog={setIsInfoOpen}>
                                {service.service_info}
                            </Dialog>
                        }
                    </>
                }
                {
                    isOpen &&
                    <Dialog setDialog={setIsOpen}>
                        <div className="dialog__caption ">
                            Mitarbeiter wählen
                        </div>
                        <div className="dialog__content">
                            <div className="staffList list">
                                <div
                                    className="list-item selectionMode"
                                    onClick={(e) => handleEmployeeClicked(e, null)}
                                >
                                    <img src={staffarbitrary} alt="staff" />
                                    <span>- beliebig -</span>
                                </div>
                                {employees.map((employee) => {
                                    if (employee.skills.includes(service.service_name)) {
                                        return (
                                            <div
                                                key={employee.id}
                                                className="list-item selectionMode"
                                                onClick={(e) => handleEmployeeClicked(e, employee)}
                                            >
                                                <img src={staffarbitrary} alt="staff" />
                                                <span>{employee.firstname} {employee.lastname}</span>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </Dialog>
                }
            </div >
        </>
    )
}

export default ServiceDialog