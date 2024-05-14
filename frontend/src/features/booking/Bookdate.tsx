import { DayPicker } from "react-day-picker"
import { de } from "date-fns/locale";
import useSessionContext from "../../hooks/useSessionContext";
import useServiceContext from "../../hooks/useServiceContext";
import DateProposals from "./DateProposals";
import MultiRangeSlider from "../../components/ui/MultiRangeSlider";
import { FilterTimeType } from "../../utils/types";
import { proposalDateRangeValues } from "../../constants";
import "./Calendar.scss"

const Bookdate = () => {

    const { setActiveTab } = useSessionContext();
    const {
        appointment,
        setAppointment,
        filterTime,
        setFilterTime,
        freeTimeslots,
    } = useServiceContext();

    const handleBackButtonClicked = () => {
        setActiveTab("services");
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isSameDay = (date: Date): boolean => {
        const today = new Date();
        // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
        today.setHours(0, 0, 0, 0);

        // Check if both dates have the same year, month, and day
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    };

    const isTooFarIntoFuture = (date: Date): boolean => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date 2 months from now
        const futureDate = new Date();
        futureDate.setMonth(currentDate.getMonth() + 3);

        // Compare the input date with the future date
        return date > futureDate;
    };

    const isBooked = (date: Date) => {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const dateString = day + "." + month + "." + year;

        //Iterate through each object
        for (let timeslot of freeTimeslots) {
            const startDate = new Date(timeslot.startDate)
            const startDay = ("0" + startDate.getDate()).slice(-2);
            const startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
            const startYear = startDate.getFullYear();
            const startDateString = startDay + "." + startMonth + "." + startYear;

            // Check if the startDate of the object is on the same date as the given date
            if (startDateString === dateString) {
                return false; // Object exists with a startDate on the given date
            }
        }
        return true; // No object found with a startDate on the given date
    }

    const handleMultiRangeSliderChange = ({ min, max }: FilterTimeType) => {
        setFilterTime({
            min,
            max,
        })
    }

    return (
        <div className="page">
            <div className="col-2-1">
                <span className="captionLabel">
                    Bitte wählen Sie einen Tag
                </span>
                <DayPicker
                    mode="single"
                    modifiers={{
                        pastDate: isPastDate,
                        today: isSameDay,
                        futureDate: isTooFarIntoFuture,
                        booked: isBooked,
                    }}
                    modifiersClassNames={{
                        pastDate: "past-date",
                        today: "today",
                        futureDate: "future-date",
                        booked: "booked",
                    }}
                    selected={appointment}
                    onSelect={setAppointment}
                    locale={de}
                />
                <div className="calendarLegend">
                    <span className="busyInfo">
                        keine Termine
                    </span>
                    <span className="freeInfo">
                        Termine verfügbar
                    </span>
                </div>
                <div className="proposalsFilterContainer">
                    <span className="label">
                        Hier können Sie den Zeitraum Ihrer Verfügbarkeit einschränken
                    </span>
                    <div className="proposalsRangeSlider">
                        <div className="proposalsRangeSliderLabel">
                            {filterTime.min}
                        </div>
                        <MultiRangeSlider
                            min="08:00"
                            max="18:00"
                            rangeValues={proposalDateRangeValues}
                            onChange={handleMultiRangeSliderChange}
                        />
                        <div className="proposalsRangeSliderLabel">
                            {filterTime.max}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2-2">
                <span className="captionLabel">
                    Bitte wählen Sie einen Termin
                </span>
                <DateProposals />
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
                <button
                    className="bookingFormButton"
                    type="button"
                    disabled={true}
                >
                    <span>Weiter</span>
                </button>
            </div>
        </div>
    )
}

export default Bookdate