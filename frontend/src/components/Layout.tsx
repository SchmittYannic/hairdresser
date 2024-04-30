import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {
    return (
        <div className="container w-full">
            <div className="col col-sm-12">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default Layout