import { isAxiosError } from "axios"
import { useMutation } from "react-query"
import api from "../api"
import useSessionContext from "./useSessionContext"

const useLogout = () => {
    const { resetState } = useSessionContext();

    const logout = async () => {
        const response = await api.delete("/auth", { withCredentials: true })
        return response.data
    }

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            console.log("[Logout] onSettled");
            try {
                resetState();
                console.log("[Logout] resetState complete");
            } catch (e) {
                console.error("[Logout] Error in resetState", e);
            }

            try {
                console.log("[Logout] post-resetState logic");
                const bc = new BroadcastChannel("auth");
                bc.postMessage({ type: "LOGOUT" });
                bc.close();
            } catch (e) {
                console.error("[Logout] post-resetState error", e);
            }

            // try {
            //     if ("BroadcastChannel" in window) {
            //         console.log("User Agent:", navigator.userAgent);
            //         console.log("BroadcastChannel in window?", "BroadcastChannel" in window);
            //         const bc = new BroadcastChannel("auth");
            //         bc.postMessage({ type: "LOGOUT" });
            //         bc.close();
            //     } else {
            //         console.warn("BroadcastChannel not supported on this browser");
            //     }
            // } catch (e) {
            //     console.error("BroadcastChannel error during logout", e);
            // }
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                console.error(error.response.data.message)
            } else {
                console.error("An error occured in useLogout")
            }
        }
    })
}

export default useLogout