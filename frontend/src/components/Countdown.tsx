import { useEffect, useState } from "react";
import useSessionContext from "../hooks/useSessionContext"

const Countdown = () => {
    const { cookieInfo } = useSessionContext();
    const countDownDate = new Date(cookieInfo.cookie_expires).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    const minutes = Math.floor(countDown / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    const display =
        minutes >= 1
            ? `Logout in: ${minutes} Min.`
            : `Logout in: ${seconds} Sec.`;

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return (
        <span className="sessionTimeoutLabel">
            {display}
        </span>
    )
}

export default Countdown