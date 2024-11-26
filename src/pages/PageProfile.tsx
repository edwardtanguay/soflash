import { useTypedStoreState } from "../store/easy-peasy-hooks";

export const PageProfile = () => {
	const { user } = useTypedStoreState((state) => state.flashcardModel);

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
					<p className="mb-3">
						However, if you want your history to be availbe
						to you on other devices, you need to set up an account
						and log in. This feature will be added soon.
					</p>
					<div>
						<button className="normal">Reset score and delete all flashcard-taking history</button>
					</div>
				</>
			)}
		</>
	);
};
