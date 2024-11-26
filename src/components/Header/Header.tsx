import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import { Nav } from "../Nav";
import * as qstr from "../../qtools/qstr";
import "./styles.scss";

export const Header = () => {
	const { user } = useTypedStoreState((state) => state.flashcardModel);
	const { isSmartphone, responsiveCssClass } = useTypedStoreState(
		(state) => state.mainModel
	);

	return (
		<section className="areaHeader">
			<div className={responsiveCssClass}>
				<div
					className={`flex justify-between ${
						isSmartphone ? "flex-col" : ""
					}`}
				>
					<div>
						<h1 className="text-[2rem] text-slate-800">
							Social Flashcards
						</h1>
					</div>
					<div
						className={`flex flex-col ${
							isSmartphone ? "items-start" : "items-end"
						}`}
					>
						<div className="flex gap-2">
							<img
								src={`images/users/${user.idCode}.jpg`}
								className="w-[1.8rem] h-[1.8rem] rounded-full "
							/>
							<p className="text-[1.2rem] text-slate-800">
								{user.firstName}
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
