import { Flashcard } from "./types";

export const sortFlashcardsWhenAddedDescending = (
	flashcards: Flashcard[]
): Flashcard[] => {
	return flashcards.sort((a, b) => (a.whenCreated > b.whenCreated ? -1 : 1));
};

export const sortFlashcardsWhenAddedAscending = (
	flashcards: Flashcard[]
): Flashcard[] => {
	return flashcards.sort((a, b) => (a.whenCreated < b.whenCreated ? -1 : 1));
};
