import IconButton from "@mui/material/IconButton";
import React, { useEffect, useRef, useState } from "react";

import { BiMenu } from "react-icons/bi";
import useScrollY from "../../hooks/useScrollY";
import NavigationStore from "../../stores/NavigationStore";
import handleSmoothScrolling from "../../utils/handleSmoothScroll";

import styles from "./NavBar.module.css";

type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
	const navContainerRef = useRef<HTMLElement | null>(null);
	const navLinksMenuRef = useRef<HTMLElement | null>(null);
	const { current: currentPage } = NavigationStore();

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

	useEffect(() => {
		if (!currentPage || !navLinksMenuRef.current) {
			return;
		}

		const linksMenuNode = navLinksMenuRef.current;

		linksMenuNode.childNodes.forEach(node => {
			const list = node as HTMLLIElement;
			const anchor = list.firstChild as HTMLAnchorElement;

			if (!anchor) {
				return;
			}

			const anchorHref = anchor.getAttribute("href");
			if (currentPage.href === anchorHref) {
				list.dataset["active"] = "";
			} else {
				delete list.dataset["active"];
			}

			// console.log("Anchor?", anchor.getAttribute("href"));
		});
	}, [currentPage]);

	return (
		<nav className={styles.container} ref={navContainerRef}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<a href="/">{"DevLTS Logo"}</a>
				</div>
				<div className={styles.interactions}>
					<menu className={styles.linksMenu} ref={navLinksMenuRef}>
						<li>
							<a
								onClick={ev =>
									handleSmoothScrolling(ev, "projects")
								}
								href="#projects"
							>
								Projects
							</a>
						</li>
						<li>
							<a
								onClick={ev =>
									handleSmoothScrolling(ev, "details")
								}
								href="#details"
							>
								Details
							</a>
						</li>
						<li>
							<a
								onClick={ev =>
									handleSmoothScrolling(ev, "about")
								}
								href="#about"
							>
								About
							</a>
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
