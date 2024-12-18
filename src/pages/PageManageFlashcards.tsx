import { useTypedStoreState } from "../store/easy-peasy-hooks";

export const PageManageFlashcards = () => {
	const { flashcards } = useTypedStoreState(state => state.flashcardModel);

	return (
		<p>there are {flashcards.length} flashcards</p>
	);
};
