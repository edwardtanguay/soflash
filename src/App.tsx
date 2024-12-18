/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { useTypedStoreActions } from "./store/easy-peasy-hooks";
import { useEffect } from "react";

function App() {
	const { initialize, setScreenWidth } = useTypedStoreActions(
		(actions) => actions.mainModel
	);

	useEffect(() => {
		const handleResize = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	initialize();

	return (
		<main className="bg-slate-400 p-4 w-full md:w-[60rem] mt-0 md:mt-6">
			<Header />
			<main className="py-4">
				<Outlet />
			</main>
		</main>
	);
}

export default App;
