import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import "./styles.scss";

export const PageManageFlashcards = () => {
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	return (
		<section className="pageManageFlashcards">
			<h2 className="text-xl">{flashcards.length} flashcards</h2>
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
