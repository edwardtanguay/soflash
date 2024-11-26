import { action, Action, computed, Computed, Thunk, thunk } from "easy-peasy";
import { StoreModel } from "../store";
import * as config from "../../config";

export interface MainModel {
	// state
	screenWidth: number;

	// actions
	setScreenWidth: Action<this, number>;

	// computed state
	isSmartphone: Computed<this, boolean>;
	responsiveCssClass: Computed<this, string>;

	// thunks
	initialize: Thunk<this, void, void, StoreModel>;
}

export const mainModel: MainModel = {
	// state
	screenWidth: 0,

	// computed state
	isSmartphone: computed((state) => {
		return state.screenWidth <= config.responsiveWidthBreak();
	}),
	responsiveCssClass: computed((state) => {
		return state.isSmartphone ? "sizeSmartphone" : "sizeComputer";
	}),

	// actions
	setScreenWidth: action((state, screenWidth) => {
		state.screenWidth = screenWidth;
	}),

	// thunks
	initialize: thunk((_, __, { getStoreActions }) => {
		getStoreActions().flashcardModel.loadFlashcards();
	}),
};
