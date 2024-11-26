import { Thunk, thunk } from "easy-peasy";
import { StoreModel } from "../store";

export interface MainModel {
	// state
	screenWidth: number;

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	//state
	screenWidth: 0,

	// thunks
	initialize: thunk((_, __, { getStoreActions }) => {
		getStoreActions().flashcardModel.loadFlashcards();
	}),
};
