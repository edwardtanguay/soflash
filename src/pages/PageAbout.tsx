export const PageAbout = () => {
	return (
		<p className="mb-3 text-sm italic">
			This site was made with React, TypeScript, Tailwind, Easy-Peasy
			Redux, see{" "}
			<a
				target="_blank"
				href="https://github.com/edwardtanguay/soflash"
				className="underline"
			>
				repo
			</a>
			,{" "}
			<a
				href="https://soflash.vercel.app"
				target="_blank"
				className="underline"
			>
				site
			</a>{" "}
			or more of my{" "}
			<a
				className="underline"
				target="_blank"
				href="https://tanguay-eu.vercel.app/howtos"
			>
				projects.
			</a>
		</p>
	);
};
