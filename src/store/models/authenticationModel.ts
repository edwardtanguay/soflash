import { action, Action, Computed, computed, persist } from "easy-peasy";
import { blankUser, User } from "../../types";

export interface AuthenticationModel {
	// state
	user: User;

	// computed state
	userFullName: Computed<this, string>;

	// actions
	incrementTotalScore: Action<this, number >;

	// thunks
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
		})

		// thunks
	},
	{
		storage: "localStorage",
		allow: ["user"],
	}
);
