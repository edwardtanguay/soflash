import { useTypedStoreState } from "../../store/easy-peasy-hooks";
import * as config from "../../config";
import "./styles.scss";

export const DevPanel = () => {
	const { screenWidth, isSmartphone, responsiveCssClass } = useTypedStoreState((state) => state.mainModel);
	const { user } = useTypedStoreState((state) => state.authenticationModel);

	return (
		<>
			{config.devMode() && (
				<section className="areaDevPanel bg-slate-950 text-slate-300 p-3 mb-3 font-mono text-sm">
					<h2 className="mb-2 text-slate-500 text-xl">
						Developer Panel
					</h2>
					<div className="text-xs">
						<ul>
							<li>
								screenWidth:{" "}
								<span className="data">{screenWidth}</span>
							</li>
							<li>
								isSmartphone:{" "}
								<span
									className={`data ${
										isSmartphone ? "isTrue" : "isFalse"
									}`}
								>
									{isSmartphone ? "true" : "false"}
								</span>
							</li>
							<li>
								responsiveCssClass:{" "}
								<span className="data">
									{responsiveCssClass}
								</span>
							</li>
						</ul>
					</div>
					<pre className="mt-3 text-xs text-orange-700 h-[20rem] overflow-y-auto">
						{JSON.stringify(user, null, 2)}
					</pre>
				</section>
			)}
		</>
	);
};
