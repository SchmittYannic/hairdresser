import { useMemo } from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker"
import { de } from "date-fns/locale";

import useWindowSize from "src/hooks/useWindowSize";
import useSessionContext from "src/hooks/useSessionContext";
import useServiceContext from "src/hooks/useServiceContext";
import useAppointmentContext from "src/hooks/useAppointmentContext";
import DateProposals from "src/features/booking/DateProposals";
import Confirmdate from "src/features/booking/Confirmdate";
import MultiRangeSlider from "src/components/ui/MultiRangeSlider";
import { FilterTimeType, FreeTimeslotType } from "src/utils/types";
import { proposalDateRangeValues } from "src/constants";
import { getPossibleSlotsPerWeekday } from "src/utils/functions";
import "src/features/booking/Calendar.scss"

const NextButton = () => {
    const {
        setActiveTab,
    } = useSessionContext();

    const { appointment } = useAppointmentContext();

    const handleNextButtonClicked = () => {
        setActiveTab("confirmdate");
    };

    return (
        <button
            className="bookingFormButton"
            type="button"
            onClick={handleNextButtonClicked}
            disabled={!appointment}
        >
            <span>Weiter</span>
        </button>
    )
}

const Bookdate = () => {

    const {
        activeTab,
        setActiveTab,
    } = useSessionContext();

    const {
        calendarDay,
        setCalendarDay,
        filterTime,
        setFilterTime,
        freeTimeslots,
        serviceInfo,
    } = useServiceContext();

    const windowSize = useWindowSize();
    const isLgScreen = windowSize.width && windowSize.width > 640 ? true : false;

    const handleBackButtonClicked = () => {
        setActiveTab("services");
    };

    const handleMultiRangeSliderChange = ({ min, max }: FilterTimeType) => {
        setFilterTime({
            min,
            max,
        })
    };

    const handleSelectCalendar: SelectSingleEventHandler = (day: Date | undefined) => {
        setCalendarDay(day);
    }

    // const isPastDate = (date: Date) => {
    //     const today = new Date();
    //     // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
    //     today.setHours(0, 0, 0, 0);
    //     return date < today;
    // };

    const isSameDay = (date: Date): boolean => {
        const today = new Date();
        // Set hours, minutes, seconds, and milliseconds to 0 to compare dates without time
        today.setHours(0, 0, 0, 0);

        // Check if both dates have the same year, month, and day
        return date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
    };

    // const isTooFarIntoFuture = (date: Date): boolean => {
    //     // Get the current date
    //     const currentDate = new Date();

    //     // Calculate the date 2 months from now
    //     const futureDate = new Date();
    //     futureDate.setMonth(currentDate.getMonth() + 3);

    //     // Compare the input date with the future date
    //     return date > futureDate;
    // };

    const computeBookingMap = (
        freeTimeslots: FreeTimeslotType[],
        slotLength: number,
    ): Map<string, number> => {
        const slotsPerWeekday = getPossibleSlotsPerWeekday(serviceInfo, slotLength);
        const dateCounts = new Map<string, number>();

        for (const slot of freeTimeslots) {
            const date = new Date(slot.startDate);
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            const dateString = day + "." + month + "." + year;

            dateCounts.set(dateString, (dateCounts.get(dateString) || 0) + 1);
        }

        const bookingMap = new Map<string, number>();

        for (const [dayKey, availableCount] of dateCounts.entries()) {
            const [day, month, year] = dayKey.split('.');
            const dayNum = parseInt(day, 10);
            const monthNum = parseInt(month, 10) - 1;
            const yearNum = parseInt(year, 10);
            const date = new Date(yearNum, monthNum, dayNum);

            const weekday = date.getDay();
            const slotsPerDay = slotsPerWeekday[weekday];

            if (slotsPerDay === 0) {
                bookingMap.set(dayKey, 100); // treat as fully booked / unavailable
                continue;
            }

            const bookedPercent = ((slotsPerDay - availableCount) / slotsPerDay) * 100;
            bookingMap.set(dayKey, bookedPercent);
        }

        return bookingMap;
    };

    const getBookingModifier = (bookingMap: Map<string, number>, lower: number, upper?: number) => {
        return (date: Date) => {
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            const dateString = day + "." + month + "." + year;

            const percent = bookingMap.get(dateString) ?? 100; // assume 100% booked if missing

            return upper ? percent > lower && percent <= upper : percent >= lower;
        };
    };

    const bookingMap = useMemo<Map<string, number>>(() => {
        return computeBookingMap(freeTimeslots, 30)
    }, [freeTimeslots]);

    const modifiers = useMemo(() => ({
        // pastDate: isPastDate,
        today: isSameDay,
        // futureDate: isTooFarIntoFuture,
        booked0: getBookingModifier(bookingMap, 0, 20),
        booked20: getBookingModifier(bookingMap, 20, 40),
        booked40: getBookingModifier(bookingMap, 40, 60),
        booked60: getBookingModifier(bookingMap, 60, 80),
        booked80: getBookingModifier(bookingMap, 80, 99),
        fullyBooked: getBookingModifier(bookingMap, 100),
    }), [bookingMap]);

    return (
        <>
            <div className={`page${activeTab === "bookdate" ? "" : " excluded"}`}>
                <div className="col-2-1">
                    <span className="captionLabel">
                        Bitte wählen Sie einen Tag
                    </span>
                    <DayPicker
                        mode="single"
                        modifiers={modifiers}
                        modifiersClassNames={{
                            // pastDate: "past-date",
                            today: "today",
                            // futureDate: "future-date",
                            booked0: "booked0",
                            booked20: "booked20",
                            booked40: "booked40",
                            booked60: "booked60",
                            booked80: "booked80",
                            fullyBooked: "fullyBooked",
                        }}
                        selected={calendarDay}
                        onSelect={handleSelectCalendar}
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
                    {
                        isLgScreen &&
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
                    }
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
                    <NextButton />
                </div>
            </div>
            {activeTab === "confirmdate" && <Confirmdate />}
        </>
    )
}

export default Bookdate