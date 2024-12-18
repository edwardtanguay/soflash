import { Action, action, thunk, Thunk } from "easy-peasy";
import {
	blankFlashcardHistoryItem,
	emptyFlashcard,
	Flashcard,
	FlashcardFilterItem,
	FlashcardHistoryItem,
	TestingStatus,
} from "../../types";
import * as dataModel from "../db/dataModel";
import { StoreModel } from "../store";
import * as appTools from "../../appTools";

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
	flashcardFilterItems: FlashcardFilterItem[];
	selectedFilterIdCode: string;

	// actions
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
	loadFlashcards: Thunk<this, void, void, StoreModel>;
	addAmountToFlashcardFilterItems: Thunk<this, void, void, StoreModel>;
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
	flashcardFilterItems: [
		{
			idCode: "mostRecent",
			label: "Most Recent",
			amount: 0,
		},
		{
			idCode: "spanish",
			label: "Spanish",
			amount: 0,
		},
		{
			idCode: "french",
			label: "French",
			amount: 0,
		},
		{
			idCode: "italian",
			label: "Italian",
			amount: 0,
		},
		{
			idCode: "search",
			label: "Search",
			amount: 0,
		},
	],
	selectedFilterIdCode: "search",

	// actions
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
			case "mostRecent":
				state.filteredFlashcards = appTools
					.sortFlashcardsWhenAddedDescending(state.flashcards)
					.slice(0, 10);
				break;
			case "spanish":
				state.filteredFlashcards = state.flashcards.filter(
					(m) => m.language === "es"
				);
				state.filteredFlashcards =
					appTools.sortFlashcardsWhenAddedDescending(
						state.filteredFlashcards
					);
				break;
			case "french":
				state.filteredFlashcards = state.flashcards.filter(
					(m) => m.language === "fr"
				);
				state.filteredFlashcards =
					appTools.sortFlashcardsWhenAddedDescending(
						state.filteredFlashcards
					);
				break;
			case "italian":
				state.filteredFlashcards = state.flashcards.filter(
					(m) => m.language === "it"
				);
				state.filteredFlashcards =
					appTools.sortFlashcardsWhenAddedDescending(
						state.filteredFlashcards
					);
				break;
		}
		state.selectedFilterIdCode = filterIdCode;
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
	loadFlashcards: thunk((actions, _, { getState }) => {
		getState().flashcards = dataModel.getFlashcards();
		actions.addAmountToFlashcardFilterItems();
		getState().filteredFlashcards = structuredClone(getState().flashcards);
	}),
	addAmountToFlashcardFilterItems: thunk((actions, _, { getState }) => {
		getState().flashcardFilterItems.forEach((ffi) => {
			actions.setFilteredFlaschards(ffi.idCode);
			ffi.amount = getState().filteredFlashcards.length;
		});
	}),
};
