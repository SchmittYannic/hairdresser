import { useEffect, useState } from "react";
import useSessionContext from "../hooks/useSessionContext"

const Countdown = () => {
    const { userInfo } = useSessionContext();
    const countDownDate = new Date(userInfo.cookie_expires).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    const remainingTimeInMin = Math.ceil(countDown / (1000 * 60))

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return (
        <span className="sessionTimeoutLabel">
            Logout in: {remainingTimeInMin} Min.
        </span>
    )
}

export default Countdown