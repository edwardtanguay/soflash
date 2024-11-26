import { action, Action, Computed, computed, persist, thunk, Thunk } from "easy-peasy";
import { blankUser, FlashcardHistoryItem, User } from "../../types";

export interface AuthenticationModel {
	// state
	user: User;

	// computed state
	userFullName: Computed<this, string>;

	// actions
	incrementTotalScore: Action<this, number>;
	setFlashcardHistoryItem: Action<this, [string, FlashcardHistoryItem]>;

	// thunks
	clearLocalStorage: Thunk<this>;
}

export const authenticationModel: AuthenticationModel = persist(
	{
		// state
		user: blankUser,

		// computed state
		userFullName: computed((state) => {
			return state.user.firstName + " " + state.user.lastName;
		}),

		// actions
		incrementTotalScore: action((state, increaseBy) => {
			console.log(11115, increaseBy);
			state.user.totalScore += increaseBy;
		}),
		setFlashcardHistoryItem: action((state, payload) => {
			const [testingFlashcardIdCode, flashcardHistoryItem] = payload;
			state.user.flashcardHistory[testingFlashcardIdCode] =
				flashcardHistoryItem;
		}),

		// thunks
		clearLocalStorage: thunk(() => {
			console.log(11116, 'going to clear');
		})
	},
	{
		storage: "localStorage",
		allow: ["user"],
	}
);
