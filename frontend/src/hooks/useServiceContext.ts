import { useContext } from "react";
import { ServiceContext } from "../context/ServiceProvider";

const useServiceContext = () => {
    return useContext(ServiceContext);
};

export default useServiceContext;