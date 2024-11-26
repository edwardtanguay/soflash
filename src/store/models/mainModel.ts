import { computed, Computed, Thunk, thunk } from "easy-peasy";
import { StoreModel } from "../store";

export interface MainModel {
	// state

	// computed state
	screenWidth: Computed<this, number>;

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	//state

	// computed state
	screenWidth: computed(() => {
		return 999;
	}),

	// thunks
	initialize: thunk((_, __, { getStoreActions }) => {
		getStoreActions().flashcardModel.loadFlashcards();
	}),
};
