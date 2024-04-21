import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Frontpage from "./components/Frontpage"
import Bookingpage from "./components/Bookingpage"

const App = () => {

	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				<Route index element={<Frontpage />} />
				<Route path="terminbuchung" element={<Bookingpage />} />
			</Route>
		</Routes>
	)
}

export default App
