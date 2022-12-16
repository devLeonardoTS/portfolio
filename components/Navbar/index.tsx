import React, { useRef, useState } from "react";

import PageHrefs from "../../data/PageHrefs";
import useScrollY from "../../hooks/useScrollY";
import handleSmoothScrolling from "../../utils/handleSmoothScroll";
import NavLink from "../NavLink";
import styles from "./NavBar.module.css";

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
	const navContainerRef = useRef<HTMLElement | null>(null);
	const navLinksMenuRef = useRef<HTMLElement | null>(null);

	const [onSDTimer, setOnSDTimer] = useState<NodeJS.Timeout>();

	useScrollY({
		onScrollDown: () => {
			clearTimeout(onSDTimer);

			const timer = setTimeout(() => {
				navContainerRef.current?.classList.add("-translate-y-full");
			}, 2 * 1000);

			setOnSDTimer(timer);
		},
		onScrollUp: () => {
			clearTimeout(onSDTimer);
			navContainerRef.current?.classList.remove("-translate-y-full");
		},
	});

	return (
		<nav className={styles.container} ref={navContainerRef}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<NavLink href={PageHrefs.home}>{"DevLTS Logo"}</NavLink>
				</div>
				<div className={styles.interactions}>
					<menu className={styles.linksMenu} ref={navLinksMenuRef}>
						<li>
							<NavLink
								onClick={ev =>
									handleSmoothScrolling(ev, "projects")
								}
								href="#projects"
							>
								Projects
							</NavLink>
						</li>
						<li>
							<NavLink
								onClick={ev =>
									handleSmoothScrolling(ev, "details")
								}
								href="#details"
							>
								Details
							</NavLink>
						</li>
						<li>
							<NavLink
								onClick={ev =>
									handleSmoothScrolling(ev, "about")
								}
								href="#about"
							>
								About
							</NavLink>
						</li>
					</menu>

					{/** Todo: Menu for more features: Project Listing; Blog posts; Anything else... */}

					{/* <IconButton
						className={styles.sideMenuToggler}
						onClick={() => {
							console.log("Toggle side menu");
						}}
					>
						<BiMenu />
					</IconButton> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
