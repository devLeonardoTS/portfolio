import React, { useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import NavigationStore from "../../../stores/NavigationStore";
import createNavData from "../../../utils/createNavData";
import styles from "./About.module.css";

type AboutProps = {
	id?: string;
};

const About = ({ id }: AboutProps) => {
	const { setNavCurrent, current, previous } = NavigationStore();
	const sectionElRef = useRef<HTMLElement | null>(null);

	useIntersectionObserver(sectionElRef, {
		threshold: [0.1, 0.6],
		onEnter: () =>
			setNavCurrent(createNavData({ href: "#about", name: "About" })),
	});

	return (
		<section id={id} className={styles.container} ref={sectionElRef}>
			<div className={styles.content}>
				<h2>
					{`And I'm the`} <strong>{`About Section.`}</strong>
				</h2>
			</div>
		</section>
	);
};

export default About;
