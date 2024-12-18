import { Flashcard } from "../../types";
import * as importModel from "./importModel";
import * as qstr from "../../qtools/qstr";

export let numberOfErrors = 0;

const [cleanSourceFlashcards, errorCount] =
	importModel.getCleanSourceFlashcards();
numberOfErrors += errorCount;

export const getFlashcards = (): Flashcard[] => {
	const flashcards: Flashcard[] = [];
	for (const cleanSourceFlashcard of cleanSourceFlashcards) {
		const flashcard: Flashcard = {
			idCode: qstr.createSuuid(),
			language: cleanSourceFlashcard.language,
			front: cleanSourceFlashcard.front,
			back: cleanSourceFlashcard.back,
			whenCreated: cleanSourceFlashcard.whenCreated,
			extras: cleanSourceFlashcard.extras,
			bulkSearch: "",
		};
		flashcard.bulkSearch = [flashcard.front, flashcard.back].join("|");

		if (!flashcard.back.includes(";") && !flashcard.back.includes("[")) {
			flashcards.push(flashcard);
		}
	}
	return flashcards;
};
