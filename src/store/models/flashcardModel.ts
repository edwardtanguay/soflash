import { Action, action, thunk, Thunk } from "easy-peasy";
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
	filteredFlashcards: Flashcard[];
	flashcardSearchText: string;
	testingFlashcard: Flashcard;
	answer: string;
	answerIsCorrect: boolean;
	testingStatus: TestingStatus;
	numberRight: number;
	numberWrong: number;
	wrongAnswers: string[];

	// actions
	loadFlashcards: Action<this>;
	handleFlashcardSearchTextChange: Action<this, string>;
	setAnswer: Action<this, string>;
	setAnswerIsCorrect: Action<this, boolean>;
	setTestingStatus: Action<this, TestingStatus>;
	setNumberRight: Action<this, number>;
	setNumberWrong: Action<this, number>;
	addWrongAnswer: Action<this, string>;
	resetTestingFlashcard: Action<this>;
	setFilteredFlaschards: Action<this, string>;

	// thunks
	setNextTestingFlashcard: Thunk<this, void, void, StoreModel>;
}

export const flashcardModel: FlashcardModel = {
	// state
	flashcards: [],
	filteredFlashcards: [],
	flashcardSearchText: "",
	testingFlashcard: emptyFlashcard,
	answer: "",
	answerIsCorrect: false,
	testingStatus: "typingAnswer",
	numberRight: 0,
	numberWrong: 0,
	wrongAnswers: [],

	// actions
	loadFlashcards: action((state) => {
		state.flashcards = dataModel.getFlashcards();
		state.filteredFlashcards = structuredClone(state.flashcards);
	}),
	handleFlashcardSearchTextChange: action((state, searchText) => {
		state.flashcardSearchText = searchText;
		state.filteredFlashcards = state.flashcards.filter((m) =>
			m.bulkSearch
				.toLowerCase()
				.includes(state.flashcardSearchText.toLowerCase())
		);
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
	setFilteredFlaschards: action((state, filterIdCode) => {
		state.flashcardSearchText = "";
		switch (filterIdCode) {
			case "latest10":
				state.filteredFlashcards = state.flashcards
					.sort((a, b) => (a.whenCreated > b.whenCreated ? -1 : 1))
					.slice(0, 10);
				break;
			case "latest50":
				state.filteredFlashcards = state.flashcards
					.sort((a, b) => (a.whenCreated > b.whenCreated ? -1 : 1))
					.slice(0, 50);
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
			getStoreActions().authenticationModel.setFlashcardHistoryItem([
				getState().testingFlashcard.idCode,
				flashcardHistoryItem,
			]);
		}
	),
};
