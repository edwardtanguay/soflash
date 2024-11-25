import { Thunk, thunk } from "easy-peasy";
import { StoreModel } from "../store";

export interface MainModel {
	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	// thunks
	initialize: thunk((actions, _, { getStoreActions }) => {
		getStoreActions().flashcardModel.loadFlashcards();
	}),
};
