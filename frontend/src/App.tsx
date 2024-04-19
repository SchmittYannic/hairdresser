import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Frontpage from "./components/Frontpage"

const App = () => {

	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				<Route index element={<Frontpage />} />
			</Route>
		</Routes>
	)
}

export default App
