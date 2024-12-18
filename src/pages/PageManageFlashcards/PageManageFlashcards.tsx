import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import "./styles.scss";

export const PageManageFlashcards = () => {
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	return (
		<section className="pageManageFlashcards">
			<p>there are {flashcards.length} flashcards</p>
			<table>
				<thead>
					<tr>
						<th>Language</th>
						<th>Front</th>
						<th>Back</th>
						<th>When Created</th>
						<th>Extras</th>
					</tr>
				</thead>
				<tbody>
					{flashcards.map((flashcard, index) => {
						return (
							<tr key={index}>
								<td>Row 3, Cell 2</td>
								<td>{flashcard.front}</td>
								<td>Row 3, Cell 3</td>
								<td>Row 3, Cell 4</td>
								<td>Row 3, Cell 5</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
};
