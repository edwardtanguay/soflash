import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import "./index.scss";
import { PageLearn } from "./pages/PageLearn.tsx";
import { PageAbout } from "./pages/PageAbout.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { StoreProvider } from "easy-peasy";
import { store } from "./store/store.ts";
import { PageProfile } from "./pages/PageProfile.tsx";
import { PageRegister } from "./pages/PageRegister.tsx";
import { PageLogin } from "./pages/PageLogin.tsx";
import { PageManageFlashcards } from "./pages/PageManageFlashcards/PageManageFlashcards.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "learn",
				element: <PageLearn />,
			},
			{
				path: "profile",
				element: <PageProfile />,
			},
			{
				path: "register",
				element: <PageRegister />,
			},
			{
				path: "login",
				element: <PageLogin />,
			},
			{
				path: "about",
				element: <PageAbout />,
			},
			{
				path: "manageFlashcards",
				element: <PageManageFlashcards />,
			},
			{
				path: "/",
				element: <Navigate to="/learn" replace />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StoreProvider store={store}>
		<RouterProvider router={router} />
	</StoreProvider>
);
