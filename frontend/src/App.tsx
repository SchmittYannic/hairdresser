import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Frontpage from "./components/Frontpage"
import Bookingpage from "./components/Bookingpage"
import Stylingpage from "./components/Stylingpage"
import Colourpage from "./components/Colourpage"
import Salonpage from "./components/Salonpage"

const App = () => {

	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				<Route index element={<Frontpage />} />
				<Route path="terminbuchung" element={<Bookingpage />} />
				<Route path="styling" element={<Stylingpage />} />
				<Route path="colour" element={<Colourpage />} />
				<Route path="salon" element={<Salonpage />} />
			</Route>
		</Routes>
	)
}

export default App
