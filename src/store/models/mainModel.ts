import { action, Action, Thunk, thunk } from "easy-peasy";
import { StoreModel } from "../store";

export interface MainModel {
	// state
	screenWidth: number;

	// actions
	setScreenWidth: Action<this, number>;

	// computed state

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	// state
	screenWidth: 0,

	// actions
	setScreenWidth: action((state, screenWidth) => {
		state.screenWidth = screenWidth;
	}),

	// thunks
	initialize: thunk((_, __, { getStoreActions }) => {
		getStoreActions().flashcardModel.loadFlashcards();
	}),
};
