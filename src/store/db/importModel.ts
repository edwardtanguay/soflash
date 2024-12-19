/* eslint-disable @typescript-eslint/no-explicit-any */
import { CleanSourceFlashcard, CleanSourceFlashcardSchema } from '../../types';
import _rawSourceFlashcards from './data/flashcards.json';

const rawSourceFlashcards = _rawSourceFlashcards as any[];

export const getCleanSourceFlashcards = (): [CleanSourceFlashcard[], number] => {
	let numberOfErrors = 0;
	const sourceFlashcards: CleanSourceFlashcard[] = [];
	for (const rawSourceFlashcard of rawSourceFlashcards) {
		const parseResult = CleanSourceFlashcardSchema.safeParse(rawSourceFlashcard);
		if (parseResult.success) {
			sourceFlashcards.push(rawSourceFlashcard);
		} else {
			let r = '';
			r += `INVALID FLASHCARD IN IMPORT: ${JSON.stringify(rawSourceFlashcard, null, 2)}\n`;
			parseResult.error.errors.forEach((err) => {
				r += `Error in field "${err.path.join('.')}" - ${err.message}\n`;
			});
			console.error(r);
			numberOfErrors++;
		}
	}
	return [sourceFlashcards, numberOfErrors];
};
