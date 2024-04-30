import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Frontpage from "./components/Frontpage"
import Bookingpage from "./components/Bookingpage"
import Stylingpage from "./components/Stylingpage"
import Colourpage from "./components/Colourpage"
import Salonpage from "./components/Salonpage"
import Teampage from "./components/Teampage"
import Jobspage from "./components/Jobspage"
import Kontaktpage from "./components/Kontaktpage"
import Impressum from "./components/Impressum"
import Datenschutz from "./components/Datenschutz"
import Booking from "./features/booking/Booking"

const App = () => {

	return (
		<Routes>
			<Route path="/terminbuch/termine" element={<Booking />} />
			<Route path="/" element={<Layout />} >
				<Route index element={<Frontpage />} />
				<Route path="terminbuchung" element={<Bookingpage />} />
				<Route path="styling" element={<Stylingpage />} />
				<Route path="colour" element={<Colourpage />} />
				<Route path="salon" element={<Salonpage />} />
				<Route path="team" element={<Teampage />} />
				<Route path="jobs" element={<Jobspage />} />
				<Route path="kontakt" element={<Kontaktpage />} />
				<Route path="impressum" element={<Impressum />} />
				<Route path="datenschutzerklaerung" element={<Datenschutz />} />
			</Route>
		</Routes>
	)
}

export default App
