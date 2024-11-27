import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as tools from "../tools";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import React from "react";

const menuItems = [
	{
		idCode: "learn",
		title: "Learn",
		display: true,
	},
	{
		idCode: "register",
		title: "Register",
		display: false,
	},
	{
		idCode: "login",
		title: "Login",
		display: false,
	},
	{
		idCode: "profile",
		title: "Profile",
		display: true,
	},
	{
		idCode: "about",
		title: "About",
		display: true,
	},
];

export const Nav = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const location = useLocation();
	const pageIdCode = tools.chopLeft(location.pathname, "/");
	const currentMenuItem = menuItems.find((m) => m.idCode === pageIdCode);

	const handleMenuToggle = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	return (
		<>
			{currentMenuItem && (
				<nav>
					<div className="md:hidden bg-slate-500 text-[1.2rem] px-4 py-2 content">
						<div className="flex justify-between">
							<p>
								<NavLink to={currentMenuItem.idCode}>
									{currentMenuItem.title}
								</NavLink>
							</p>
							<p
								className="mt-1 cursor-pointer"
								onClick={handleMenuToggle}
							>
								<GiHamburgerMenu />
							</p>
						</div>
						{showMobileMenu && (
							<div>
								{menuItems.map((menuItem, index) => {
									return (
										<React.Fragment key={index}>
											{menuItem.idCode !==
												currentMenuItem.idCode &&
												menuItem.display && (
													<div
														key={index}
														className="mt-[.2rem]"
													>
														<NavLink
															to={menuItem.idCode}
															onClick={() =>
																setShowMobileMenu(
																	false
																)
															}
														>
															{menuItem.title}
														</NavLink>
													</div>
												)}
										</React.Fragment>
									);
								})}
							</div>
						)}
					</div>
					<div className="hidden md:block bg-slate-500 px-4 py-2 content">
						<ul className="flex gap-4">
							{menuItems.map((menuItem, index) => {
								return (
									<React.Fragment key={index}>
										{(menuItem.display ||
											currentMenuItem.idCode ===
												menuItem.idCode) && (
											<li key={index}>
												<NavLink to={menuItem.idCode}>
													{menuItem.title}
												</NavLink>
											</li>
										)}
									</React.Fragment>
								);
							})}
						</ul>
					</div>
				</nav>
			)}
		</>
	);
};
