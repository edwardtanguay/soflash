import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import './styles.scss';

export const PageManageFlashcards = () => {
	const { flashcards } = useTypedStoreState((state) => state.flashcardModel);

	return (
		<section className="pageManageFlashcards">
			<p>there are {flashcards.length} flashcards</p>
			<table>
				<thead>
					<tr>
						<th>Column 1</th>
						<th>Column 2</th>
						<th>Column 3</th>
						<th>Column 4</th>
						<th>Column 5</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Row 1, Cell 1</td>
						<td>Row 1, Cell 2</td>
						<td>Row 1, Cell 3</td>
						<td>Row 1, Cell 4</td>
						<td>Row 1, Cell 5</td>
					</tr>
					<tr>
						<td>Row 2, Cell 1</td>
						<td>Row 2, Cell 2</td>
						<td>Row 2, Cell 3</td>
						<td>Row 2, Cell 4</td>
						<td>Row 2, Cell 5</td>
					</tr>
					<tr>
						<td>Row 3, Cell 1</td>
						<td>Row 3, Cell 2</td>
						<td>Row 3, Cell 3</td>
						<td>Row 3, Cell 4</td>
						<td>Row 3, Cell 5</td>
					</tr>
				</tbody>
			</table>
		</section>
	);
};
