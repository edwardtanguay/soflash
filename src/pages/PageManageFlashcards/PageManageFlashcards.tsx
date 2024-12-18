import {
	useTypedStoreActions,
	useTypedStoreState,
} from "../../store/easy-peasy-hooks";
import "./styles.scss";

export const PageManageFlashcards = () => {
	const {
		flashcards,
		flashcardSearchText,
		filteredFlashcards,
		flashcardFilterItems,
	} = useTypedStoreState((state) => state.flashcardModel);
	const { handleFlashcardSearchTextChange, setFilteredFlaschards } =
		useTypedStoreActions((actions) => actions.flashcardModel);

	return (
		<section className="pageManageFlashcards">
			<h2 className="text-xl">
				{filteredFlashcards.length === flashcards.length ? (
					<span>Showing all {flashcards.length} flashcards</span>
				) : (
					<span>
						Showing {filteredFlashcards.length} of{" "}
						{flashcards.length} flashcards
					</span>
				)}
			</h2>
			<form className="mt-3">
				<div className="flex gap-2">
					{flashcardFilterItems.map((ffi, index) => {
						return (
							<button
								key={index}
								type="button"
								className="btnNormal mb-3"
								onClick={() =>
									setFilteredFlaschards(ffi.idCode)
								}
							>
								{ffi.label}
							</button>
						);
					})}
				</div>
				<input
					className="text-[1.2rem] px-1"
					value={flashcardSearchText}
					onChange={(e) =>
						handleFlashcardSearchTextChange(e.target.value)
					}
					placeholder="search"
				/>
			</form>
			<table>
				<thead>
					<tr>
						<th>Lang</th>
						<th>Front</th>
						<th>Back</th>
						<th>When&nbsp;Created</th>
						<th>Extras</th>
					</tr>
				</thead>
				<tbody>
					{filteredFlashcards.map((flashcard, index) => {
						return (
							<tr key={index}>
								<td>{flashcard.language}</td>
								<td>{flashcard.front}</td>
								<td>{flashcard.back}</td>
								<td>{flashcard.whenCreated}</td>
								<td>{flashcard.extras}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
};
