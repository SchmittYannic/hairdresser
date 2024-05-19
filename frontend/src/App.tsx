import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import PersistLogin from "./features/auth/PersistLogin"
import Layout from "./components/Layout"

const Frontpage = lazy(() => import("./components/Frontpage" /* webpackChunkName: "Frontpage" */));
const Bookingpage = lazy(() => import("./components/Bookingpage" /* webpackChunkName: "Bookingpage" */));
const Stylingpage = lazy(() => import("./components/Stylingpage" /* webpackChunkName: "Stylingpage" */));
const Colourpage = lazy(() => import("./components/Colourpage" /* webpackChunkName: "Colourpage" */));
const Salonpage = lazy(() => import("./components/Salonpage" /* webpackChunkName: "Salonpage" */));
const Teampage = lazy(() => import("./components/Teampage" /* webpackChunkName: "Teampage" */));
const Jobspage = lazy(() => import("./components/Jobspage" /* webpackChunkName: "Jobspage" */));
const Kontaktpage = lazy(() => import("./components/Kontaktpage" /* webpackChunkName: "Kontaktpage" */));
const Impressum = lazy(() => import("./components/Impressum" /* webpackChunkName: "Impressum" */));
const Datenschutz = lazy(() => import("./components/Datenschutz" /* webpackChunkName: "Datenschutz" */));
const Booking = lazy(() => import("./features/booking/Booking" /* webpackChunkName: "Booking" */));

const App = () => {

	return (
		<Routes>
			<Route element={<PersistLogin />}>
				<Route path="/terminbuch/termine" element={<Suspense><Booking /></Suspense>} />
			</Route>
			<Route path="/" element={<Layout />} >
				<Route index element={<Suspense><Frontpage /></Suspense>} />
				<Route path="terminbuchung" element={<Suspense><Bookingpage /></Suspense>} />
				<Route path="styling" element={<Suspense><Stylingpage /></Suspense>} />
				<Route path="colour" element={<Suspense><Colourpage /></Suspense>} />
				<Route path="salon" element={<Suspense><Salonpage /></Suspense>} />
				<Route path="team" element={<Suspense><Teampage /></Suspense>} />
				<Route path="jobs" element={<Suspense><Jobspage /></Suspense>} />
				<Route path="kontakt" element={<Suspense><Kontaktpage /></Suspense>} />
				<Route path="impressum" element={<Suspense><Impressum /></Suspense>} />
				<Route path="datenschutzerklaerung" element={<Suspense><Datenschutz /></Suspense>} />
			</Route>
		</Routes>
	)
}

export default App
