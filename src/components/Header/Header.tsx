import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import { Nav } from "../Nav";
import * as qstr from "../../qtools/qstr";
import "./styles.scss";

export const Header = () => {
	const { user, userFullName } = useTypedStoreState(
		(state) => state.flashcardModel
	);
	const { isSmartphone, responsiveCssClass } = useTypedStoreState(
		(state) => state.mainModel
	);

	return (
		<section className="areaHeader">
			<div className={responsiveCssClass}>
				<div className="headerWrapper flex justify-between">
					<div>
						<h2 className="headerText text-slate-800">
							Social Flashcards
						</h2>
					</div>
					<div className="profileInfoWrapper flex flex-col">
						<div className="flex gap-2">
							<img
								src={`images/users/${user.idCode}.jpg`}
								className="w-[1.8rem] h-[1.8rem] rounded-full "
							/>
							<p className="text-[1.2rem] text-slate-800">
								{isSmartphone ? (
									<p>{user.firstName}</p>
								) : (
									<p>{userFullName}</p>
								)}
							</p>
						</div>
						<p className="font-mono text-slate-700 text-[2.2rem] -mt-2">
							{qstr.showScore(user.totalScore)}
						</p>
					</div>
				</div>
				<Nav />
			</div>
		</section>
	);
};
