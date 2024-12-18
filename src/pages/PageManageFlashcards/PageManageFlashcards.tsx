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
		selectedFilterIdCode,
	} = useTypedStoreState((state) => state.flashcardModel);
	const { handleFlashcardSearchTextChange, setFilteredFlashcards } =
		useTypedStoreActions((actions) => actions.flashcardModel);

	const handleFilterDropdownChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const value = e.target.value;
		setFilteredFlashcards(value);
	};

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
					<select
						value={selectedFilterIdCode}
						onChange={(e) => handleFilterDropdownChange(e)}
					>
						{flashcardFilterItems.map((ffi, index) => {
							return (
								<option key={index} value={ffi.idCode}>
									{ffi.label} ({ffi.amount})
								</option>
							);
						})}
					</select>
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
