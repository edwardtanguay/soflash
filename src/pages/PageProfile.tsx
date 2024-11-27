import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";
import * as config from "../config";
import { NavLink } from "react-router-dom";

export const PageProfile = () => {
	const { user } = useTypedStoreState((state) => state.authenticationModel);
	const { clearLocalStorage } = useTypedStoreActions(
		(actions) => actions.authenticationModel
	);

	return (
		<>
			{user.idCode === "anonymous" && (
				<>
					<p className="mb-3">
						You are currently logged in as guest user. This means
						that you can take flashcards, score points, and when you
						return to this site on this device all of your
						flashcard-taking history will be saved and you can
						continue learning and tracking your progress.
					</p>
					{config.siteIsOnline() && (
						<p className="mb-3">
							However, if you want your history to be available to
							you on other devices, you need to set up an account
							and log in. This feature will be added soon.
						</p>
					)}
					{config.siteIsLocal() && (
						<p className="mb-3">
							However, if you want your history to be available to
							you on other devices,{" "} 
							<NavLink to="register" className="underline">
								set up an account
							</NavLink>
							{" "}or{" "}
							<NavLink to="login" className="underline">
								log in
							</NavLink>
							.
						</p>
					)}
				</>
			)}
			<div>
				<button onClick={() => clearLocalStorage()} className="normal">
					Reset score and delete all flashcard-taking history
				</button>
			</div>
		</>
	);
};
