import { useState, MouseEvent } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import useServiceContext from "../../../hooks/useServiceContext";
import Dialog from "../../../components/ui/Dialog"
import { staffarbitrary } from "../../../assets";
import { OfferedServiceType, employees } from "../../../constants";

type ServiceDialogPropsType = {
    service: OfferedServiceType,
}

const ServiceDialog = ({ service }: ServiceDialogPropsType) => {

    const { serviceInfo, setServiceInfo, resetServiceInfo } = useServiceContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const handleServiceClicked = () => {
        if (serviceInfo.service_name === service.service_name) {
            resetServiceInfo()
        } else {
            setIsOpen(true)
        }
    }

    const handleEmployeeClicked = (e: MouseEvent, name: string) => {
        e.stopPropagation();
        setServiceInfo((prev) => {
            const newState = { ...prev }
            newState["service_name"] = service.service_name
            newState["service_duration"] = service.service_duration
            newState["employee_name"] = name
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
                    <span className={`staffLabel${serviceInfo.service_name !== service.service_name ? " excluded" : ""}`}>
                        - {serviceInfo.employee_name}
                    </span>
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
                                    onClick={(e) => handleEmployeeClicked(e, "beliebig")}
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
                                                onClick={(e) => handleEmployeeClicked(e, employee.id)}
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