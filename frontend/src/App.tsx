import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Frontpage from "./components/Frontpage"
import Bookingpage from "./components/Bookingpage"
import Stylingpage from "./components/Stylingpage"

const App = () => {

	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				<Route index element={<Frontpage />} />
				<Route path="terminbuchung" element={<Bookingpage />} />
				<Route path="styling" element={<Stylingpage />} />
			</Route>
		</Routes>
	)
}

export default App
