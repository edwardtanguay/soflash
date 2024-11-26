import { Computed, computed, persist } from "easy-peasy";
import { blankUser, User } from "../../types";

export interface AuthenticationModel {
	// state
	user: User;

	// computed state
	userFullName: Computed<this, string>;

	// actions

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

		// thunks
	},
	{
		storage: "localStorage",
		allow: ["user"],
	}
);
