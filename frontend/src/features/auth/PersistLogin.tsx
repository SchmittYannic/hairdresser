import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import useSessionContext from "../../hooks/useSessionContext";
import api from "../../api";


const PersistLogin = () => {

    const { setUserInfo, setCookieInfo } = useSessionContext();

    const persist = async () => {
        const response = await api.get("/auth", { withCredentials: true })
        return response.data
    }

    useQuery({
        queryFn: persist,
        retry: false,
        refetchOnWindowFocus: false,
        onSuccess: ({ userInfo, cookieInfo }) => {
            if (!userInfo || !cookieInfo) return
            setUserInfo(userInfo);
            setCookieInfo(cookieInfo);
        },
    })

    return (
        <>
            <Outlet />
        </>
    )
}

export default PersistLogin