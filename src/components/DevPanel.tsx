import { useTypedStoreState } from "../store/easy-peasy-hooks";

export const DevPanel = () => {
	const { screenWidth } = useTypedStoreState((state) => state.mainModel);

	return (
		<section className="areaDevPanel bg-slate-950 text-slate-300 p-3 mb-3 font-mono text-sm">
			<h2 className="mb-2 text-orange-100">Developer Panel</h2>
			<div className="text-xs">
				<ul>
					<li>screenWidth: {screenWidth}</li>
				</ul>
			</div>
		</section>
	);
};
