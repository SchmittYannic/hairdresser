import { lazy, Suspense, ComponentType } from "react"
import { Routes, Route } from "react-router-dom"
import PersistLogin from "./features/auth/PersistLogin"
import Layout from "./components/Layout"

const withSuspense = <P extends object>(
	Component: ComponentType<P>
): React.FC<P> => (props) => (
	<Suspense fallback={<div>Loading...</div>}>
		<Component {...props} />
	</Suspense>
);

const Frontpage = withSuspense(lazy(() => import("./components/Frontpage" /* webpackChunkName: "Frontpage" */)));
const Bookingpage = withSuspense(lazy(() => import("./components/Bookingpage" /* webpackChunkName: "Bookingpage" */)));
const Stylingpage = withSuspense(lazy(() => import("./components/Stylingpage" /* webpackChunkName: "Stylingpage" */)));
const Colourpage = withSuspense(lazy(() => import("./components/Colourpage" /* webpackChunkName: "Colourpage" */)));
const Salonpage = withSuspense(lazy(() => import("./components/Salonpage" /* webpackChunkName: "Salonpage" */)));
const Teampage = withSuspense(lazy(() => import("./components/Teampage" /* webpackChunkName: "Teampage" */)));
const Jobspage = withSuspense(lazy(() => import("./components/Jobspage" /* webpackChunkName: "Jobspage" */)));
const Kontaktpage = withSuspense(lazy(() => import("./components/Kontaktpage" /* webpackChunkName: "Kontaktpage" */)));
const Impressum = withSuspense(lazy(() => import("./components/Impressum" /* webpackChunkName: "Impressum" */)));
const Datenschutz = withSuspense(lazy(() => import("./components/Datenschutz" /* webpackChunkName: "Datenschutz" */)));
const Booking = withSuspense(lazy(() => import("./features/booking/Booking" /* webpackChunkName: "Booking" */)));


const App = () => {
	return (
		<Routes>
			<Route element={<PersistLogin />}>
				<Route path="/terminbuch/termine" element={<Booking />} />
			</Route>
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
