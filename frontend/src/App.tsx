import { ComponentType, Suspense, lazy, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import useSessionContext from "src/hooks/useSessionContext"
import PersistLogin from "src/features/auth/PersistLogin"
import Layout from "src/components/Layout"
import LayoutBooking from "src/features/booking/LayoutBooking"
import ErrorBoundary from "src/components/ErrorBoundary"
import ClipLoader from "src/components/ui/ClipLoader"

const Fallback = () => {
	return (
		<main className="error-main">
			<ClipLoader
				color={"rgb(209,213,219)"}
				loading={true}
				size={30}
			/>
		</main>
	)
}

const withSuspense = <P extends object>(
	Component: ComponentType<P>
): React.FC<P> => (props) => (
	<ErrorBoundary>
		<Suspense fallback={<Fallback />}>
			<Component {...props} />
		</Suspense>
	</ErrorBoundary>
);

const Frontpage = withSuspense(lazy(() => import("src/features/companywebsite/Frontpage" /* webpackChunkName: "Frontpage" */)));
const Bookingpage = withSuspense(lazy(() => import("src/features/companywebsite/Bookingpage" /* webpackChunkName: "Bookingpage" */)));
const Stylingpage = withSuspense(lazy(() => import("src/features/companywebsite/Stylingpage" /* webpackChunkName: "Stylingpage" */)));
const Colourpage = withSuspense(lazy(() => import("src/features/companywebsite/Colourpage" /* webpackChunkName: "Colourpage" */)));
const Salonpage = withSuspense(lazy(() => import("src/features/companywebsite/Salonpage" /* webpackChunkName: "Salonpage" */)));
const Teampage = withSuspense(lazy(() => import("src/features/companywebsite/Teampage" /* webpackChunkName: "Teampage" */)));
const Jobspage = withSuspense(lazy(() => import("src/features/companywebsite/Jobspage" /* webpackChunkName: "Jobspage" */)));
const Kontaktpage = withSuspense(lazy(() => import("src/features/companywebsite/Kontaktpage" /* webpackChunkName: "Kontaktpage" */)));
const Impressum = withSuspense(lazy(() => import("src/features/companywebsite/Impressum" /* webpackChunkName: "Impressum" */)));
const Datenschutz = withSuspense(lazy(() => import("src/features/companywebsite/Datenschutz" /* webpackChunkName: "Datenschutz" */)));
const Booking = withSuspense(lazy(() => import("src/features/booking/Booking" /* webpackChunkName: "Booking" */)));
const ResetPassword = withSuspense(lazy(() => import("src/features/booking/ResetPassword" /* webpackChunkName: "ResetPassword" */)));

const App = () => {

	const { resetState } = useSessionContext();

	// preload teamimg.webp
	useEffect(() => {
		const img = new Image();
		img.src = "/teamimg.webp";
	}, []);

	useEffect(() => {
		// const bc = new BroadcastChannel("auth");

		// bc.onmessage = (event) => {
		// 	if (event.data.type === "LOGOUT") {
		// 		resetState();
		// 	}
		// };

		// return () => {
		// 	bc.close();
		// };
	}, [resetState]);

	return (
		<Routes>
			<Route element={<PersistLogin />}>
				<Route path="/terminbuch/termine" element={<LayoutBooking />}>
					<Route index element={<Booking />} />
					<Route path="reset/:resetPasswordToken" element={<ResetPassword />} />
				</Route>
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

			{/* if route doesnt exist redirect back to frontpage */}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}

export default App
