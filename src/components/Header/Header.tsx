import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import { Nav } from "../Nav";
import * as qstr from "../../qtools/qstr";
import "./styles.scss";
import { NavLink, useLocation } from "react-router-dom";

export const Header = () => {
	const { user, userFullName } = useTypedStoreState(
		(state) => state.flashcardModel
	);
	const { isSmartphone, responsiveCssClass } = useTypedStoreState(
		(state) => state.mainModel
	);

	const location = useLocation();

	const ProfileInfoArea = () => {
		return (
			<div className="profileInfoWrapper">
				<div className="flex gap-2">
					<img
						className="rounded-full"
						src={`images/users/${user.idCode}.jpg`}
					/>
					<p className="userName text-slate-800">
						{isSmartphone ? (
							<p>{user.firstName}</p>
						) : (
							<p>{userFullName}</p>
						)}
					</p>
				</div>
				<p className="userScore font-mono text-slate-700">
					{qstr.showScore(user.totalScore)}
				</p>
			</div>
		);
	};

	return (
		<section className="areaHeader">
			<div className={responsiveCssClass}>
				<div className="headerWrapper flex justify-between">
					<div className="headerTextWrapper">
						<h2 className="headerText text-slate-800">
							Social Flashcards
						</h2>
						<p className="subheaderText">
							Learn from flashcards and share them with others
						</p>
					</div>
					[{location.pathname}]
					<NavLink to="profile">
						<ProfileInfoArea />
					</NavLink>
				</div>
				<Nav />
			</div>
		</section>
	);
};
