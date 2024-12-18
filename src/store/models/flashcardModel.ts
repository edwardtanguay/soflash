import { Action, action, computed, Computed, thunk, Thunk } from "easy-peasy";
import {
	blankFlashcardHistoryItem,
	emptyFlashcard,
	Flashcard,
	FlashcardHistoryItem,
	TestingStatus,
} from "../../types";
import * as dataModel from "../db/dataModel";
import { StoreModel } from "../store";

export interface FlashcardModel {
	// state
	flashcards: Flashcard[];
	flashcardSearchText: string;
	testingFlashcard: Flashcard;
	answer: string;
	answerIsCorrect: boolean;
	testingStatus: TestingStatus;
	numberRight: number;
	numberWrong: number;
	wrongAnswers: string[];

	// computed state
	filteredFlashcards: Computed<this, Flashcard[]>;
	flashcardNumberShowingMessage: Computed<this, string>;

	// actions
	loadFlashcards: Action<this>;
	// toggleFlashcard: Action<this, Flashcard>;
	handleFlashcardSearchTextChange: Action<this, string>;
	setAnswer: Action<this, string>;
	setAnswerIsCorrect: Action<this, boolean>;
	setTestingStatus: Action<this, TestingStatus>;
	setNumberRight: Action<this, number>;
	setNumberWrong: Action<this, number>;
	addWrongAnswer: Action<this, string>;
	resetTestingFlashcard: Action<this>;
	filterFlashcards: Action<this, string>;

	// thunks
	setNextTestingFlashcard: Thunk<this, void, void, StoreModel>;
}

export const flashcardModel: FlashcardModel = {
	// state
	flashcards: [],
	flashcardSearchText: "",
	testingFlashcard: emptyFlashcard,
	answer: "",
	answerIsCorrect: false,
	testingStatus: "typingAnswer",
	numberRight: 0,
	numberWrong: 0,
	wrongAnswers: [],

	// computed state
	filteredFlashcards: computed((state) => {
		if (state.flashcardSearchText.trim() === "") {
			return state.flashcards;
		} else {
			return state.flashcards.filter((m) =>
				m.bulkSearch
					.toLowerCase()
					.includes(state.flashcardSearchText.toLowerCase())
			);
		}
	}),
	flashcardNumberShowingMessage: computed((state) => {
		if (state.filteredFlashcards.length === state.flashcards.length) {
			return `All <span class="font-bold">${state.flashcards.length}</span> flashcards are showing:`;
		} else {
			const verb = state.filteredFlashcards.length === 1 ? "is" : "are";
			return `There ${verb} <span class="font-bold">${state.filteredFlashcards.length}</span> of ${state.flashcards.length} flashcards showing:`;
		}
	}),

	// actions
	loadFlashcards: action((state) => {
		state.flashcards = dataModel.getFlashcards();
		state.filteredFlashcards = structuredClone(state.flashcards);
	}),
	// toggleFlashcard: action((state, flashcard) => {
	// 	const _flashcard = state.flashcards.find(
	// 		(m) => m.idCode === flashcard.idCode
	// 	);
	// }),
	handleFlashcardSearchTextChange: action((state, searchText) => {
		state.flashcardSearchText = searchText;
	}),
	setAnswer: action((state, answer) => {
		state.answer = answer;
	}),
	setAnswerIsCorrect: action((state, answerIsCorrect) => {
		state.answerIsCorrect = answerIsCorrect;
	}),
	setTestingStatus: action((state, testingSTatus) => {
		state.testingStatus = testingSTatus;
	}),
	setNumberRight: action((state, numberRight) => {
		state.numberRight = numberRight;
	}),
	setNumberWrong: action((state, numberWrong) => {
		state.numberWrong = numberWrong;
	}),
	addWrongAnswer: action((state, wrongAnswer) => {
		state.wrongAnswers.push(wrongAnswer);
	}),
	resetTestingFlashcard: action((state) => {
		const randomIndex = Math.floor(Math.random() * state.flashcards.length);
		state.testingFlashcard = state.flashcards[randomIndex];
		state.answer = "";
		state.numberRight = 0;
		state.numberWrong = 0;
		state.testingStatus = "typingAnswer";
		state.wrongAnswers = [];
	}),
	filterFlashcards: action((state, filterIdCode) => {
		console.log(11111, filterIdCode);
		switch (filterIdCode) {
			case "latest10":
				state.filteredFlashcards = state.flashcards
					.sort((a, b) => (a.whenCreated > b.whenCreated ? 1 : -1))
					.slice(0, 5);
				break;
		}
	}),

	// thunks
	setNextTestingFlashcard: thunk(
		(actions, _, { getState, getStoreState, getStoreActions }) => {
			actions.resetTestingFlashcard();
			let flashcardHistoryItem: FlashcardHistoryItem =
				getStoreState().authenticationModel.user.flashcardHistory[
					getState().testingFlashcard.idCode
				];
			if (!flashcardHistoryItem) {
				flashcardHistoryItem = structuredClone(
					blankFlashcardHistoryItem
				);
			}
			// getStoreState().authenticationModel.user.flashcardHistory[ getState().testingFlashcard.idCode ] = flashcardHistoryItem;
			getStoreActions().authenticationModel.setFlashcardHistoryItem([
				getState().testingFlashcard.idCode,
				flashcardHistoryItem,
			]);
		}
	),
};
