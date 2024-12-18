import { Flashcard } from "../../types";
import * as qstr from "../../qtools/qstr";
import * as importModel from './importModel';

export let numberOfErrors = 0;

const [cleanSourceFlashcards, errorCount] = importModel.getCleanSourceFlashcards();
numberOfErrors += errorCount;

export const getFlashcards = (): Flashcard[] => {
	const flashcards: Flashcard[] = [];
	for (const cleanSourceFlashcard of cleanSourceFlashcards) {
		const flashcard: Flashcard = {
			idCode: qstr.forceCamelNotation(
				cleanSourceFlashcard.front + qstr.forcePascalNotation(cleanSourceFlashcard.back)
			),
			front: cleanSourceFlashcard.front,
			back: cleanSourceFlashcard.back,
			bulkSearch:
				" " + cleanSourceFlashcard.front + " | " + cleanSourceFlashcard.back + " ",
			isShowing: false,
		};

		if (!flashcard.back.includes(";") && !flashcard.back.includes("[")) {
			flashcards.push(flashcard);
		}
	}
	return flashcards;
};
