import { useTypedStoreActions, useTypedStoreState } from "../../store/easy-peasy-hooks";
import "./styles.scss";

export const PageManageFlashcards = () => {
	const { flashcards, flashcardSearchText } =
		useTypedStoreState((state) => state.flashcardModel);
	const {handleFlashcardSearchTextChange} = useTypedStoreActions(actions => actions.flashcardModel);

	return (
		<section className="pageManageFlashcards">
			<h2 className="text-xl">{flashcards.length} flashcards</h2>
			<form className="mt-3">
				<input
					className="text-[1.2rem] px-1"
					value={flashcardSearchText}
					onChange={(e) => handleFlashcardSearchTextChange(e.target.value)}
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
					{flashcards.map((flashcard, index) => {
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
