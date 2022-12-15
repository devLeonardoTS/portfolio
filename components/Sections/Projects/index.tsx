import React, { useEffect, useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import NavigationStore from "../../../stores/NavigationStore";
import createNavData from "../../../utils/createNavData";
import styles from "./Projects.module.css";

type ProjectsProps = {
	id?: string;
};

const Projects = ({ id }: ProjectsProps) => {
	const { setNavCurrent } = NavigationStore();
	const sectionElRef = useRef<HTMLElement | null>(null);

	useIntersectionObserver(sectionElRef, {
		threshold: [0.1, 0.6],
		onEnter: () =>
			setNavCurrent(
				createNavData({ href: "#projects", name: "Projects" })
			),
	});

	return (
		<section id={id} className={styles.container} ref={sectionElRef}>
			<div className={styles.content}>
				<h1>{`Hello world...`}</h1>
				<h2>
					{`I'm the`} <strong>{`Hero Section!`}</strong>
				</h2>
			</div>
		</section>
	);
};

export default Projects;
