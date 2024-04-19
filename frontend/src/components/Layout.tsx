import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <div className="container w-full">
            <div className="col col-sm-12">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout