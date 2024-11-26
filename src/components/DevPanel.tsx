import { useTypedStoreState } from "../store/easy-peasy-hooks";
import * as config from "../config";

export const DevPanel = () => {
	const { screenWidth, isSmartphone } = useTypedStoreState((state) => state.mainModel);

	return (
		<>
			{config.devMode() && (
				<section className="areaDevPanel bg-slate-950 text-slate-300 p-3 mb-3 font-mono text-sm">
					<h2 className="mb-2 text-orange-100">Developer Panel</h2>
					<div className="text-xs">
						<ul>
							<li>screenWidth: <span className="data">{screenWidth}</span></li>
							<li>isSmartphone: <span className="data">{isSmartphone ? 'true' : 'false'}</span></li>
						</ul>
					</div>
				</section>
			)}
		</>
	);
};
