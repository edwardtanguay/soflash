import { createStore } from "easy-peasy";
import { mainModel, MainModel } from "./models/mainModel";
import { flashcardModel, FlashcardModel } from "./models/flashcardModel";
import {
	authenticationModel,
	AuthenticationModel,
} from "./models/authenticationModel";

export type StoreModel = {
	mainModel: MainModel;
	flashcardModel: FlashcardModel;
	authenticationModel: AuthenticationModel;
};

export const store = createStore<StoreModel>({
	mainModel,
	flashcardModel,
	authenticationModel,
});
