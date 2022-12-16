import React, { DetailedHTMLProps, useEffect, useRef } from "react";
import NavigationStore from "../../stores/NavigationStore";

type NavLinkProps = DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>;

const NavLink = (props: NavLinkProps) => {
	const { current: currentPage } = NavigationStore();
	const currentHref = currentPage?.href;
	const linkElRef = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		const node = linkElRef.current;
		if (!node) {
			return;
		}

		const linkHref = node.getAttribute("href");

		if (currentHref === linkHref) {
			node.dataset["active"] = "";
		} else {
			delete node.dataset["active"];
		}
	}, [currentHref]);

	return (
		<a ref={linkElRef} {...props}>
			{props.children}
		</a>
	);
};

export default NavLink;
