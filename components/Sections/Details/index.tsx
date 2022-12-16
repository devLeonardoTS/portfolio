import React, { useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import NavigationStore from "../../../stores/NavigationStore";
import createNavData from "../../../utils/createNavData";
import styles from "./Details.module.css";

type DetailsProps = {
	id?: string;
};

const Details = ({ id }: DetailsProps) => {
	const { setNavCurrent, current, previous } = NavigationStore();
	const sectionElRef = useRef<HTMLElement | null>(null);

	useIntersectionObserver(sectionElRef, {
		threshold: [0.1, 0.6],
		onEnter: () =>
			setNavCurrent(createNavData({ href: "#details", name: "Details" })),
	});

	return (
		<section id={id} className={styles.container} ref={sectionElRef}>
			<div className={styles.content}>
				<h2>
					{`Hi, I'm the`} <strong>{`Details Section.`}</strong>
				</h2>
			</div>
		</section>
	);
};

export default Details;
