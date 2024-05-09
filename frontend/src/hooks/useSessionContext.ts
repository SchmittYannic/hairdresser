import { useContext } from "react";
import { SessionContext } from "../context/SessionProvider";

const useSessionContext = () => {
    return useContext(SessionContext);
};

export default useSessionContext;