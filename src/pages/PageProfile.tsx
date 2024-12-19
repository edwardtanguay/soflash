import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../store/easy-peasy-hooks";
import * as config from "../config";
import { NavLink } from "react-router-dom";

export const PageProfile = () => {
	const { user, userFullName, numberOfTakenFlashcards } = useTypedStoreState(
		(state) => state.authenticationModel
	);
	const { clearLocalStorage } = useTypedStoreActions(
		(actions) => actions.authenticationModel
	);
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	return (
		<>
			{user.idCode === "anonymous" && (
				<>
					<p className="mb-3">
						You are currently logged in as <b>guest user</b>.
					</p>
					<p className="mb-3">
						This means that you can take flashcards, score points,
						and when you return to this site on this device all of
						your flashcard-taking history will be saved and you can
						continue learning and tracking your progress.
					</p>
					{config.siteIsOnline() && (
						<p className="mb-3">
							However, if you want your history to be available to
							you on other devices as well, you need to set up an
							account and log in. This feature will be added soon.
						</p>
					)}
					{config.siteIsLocal() && (
						<p className="mb-3">
							However, if you want your history to be available to
							you on other devices as well,{" "}
							<NavLink to="/register" className="underline">
								set up an account
							</NavLink>{" "}
							or{" "}
							<NavLink to="/login" className="underline">
								log in
							</NavLink>
							.
						</p>
					)}
				</>
			)}

			<div className="bg-slate-600 text-slate-300 pl-3 uppercase tracking-widest mt-6">
				User Profile
			</div>
			<div className="bg-slate-300 p-3">
				<div>
					<div className="mb-3">
						<p className="text-xs">Full name:</p>
						<p className="font-semibold text-xl">{userFullName}</p>
					</div>
					<div className="mb-3">
						<p className="text-xs">Stats:</p>
						<p className="font-semibold text-xl">
							Flashcards available: {flashcards.length}
						</p>
						<p className="font-semibold text-xl">
							Flashcards taken: {numberOfTakenFlashcards}
						</p>
					</div>
					<p className="text-xs">
						Reset score and flashcard history:
					</p>
					<button
						onClick={() => clearLocalStorage()}
						className="btnDanger mt-1"
					>
						Reset now
					</button>
				</div>
			</div>
		</>
	);
};
