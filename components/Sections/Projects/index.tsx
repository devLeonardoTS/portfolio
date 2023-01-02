import React, { useRef } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import NavigationStore from "../../../stores/NavigationStore";
import createNavData from "../../../utils/createNavData";
import Carousel from "./Carousel";
import ProjectInfo from "./ProjectInfo";
import styles from "./Projects.module.css";

type ProjectsProps = {
	id?: string;
};

const Projects = ({ id }: ProjectsProps) => {
	const { setNavCurrent } = NavigationStore();
	const sectionElRef = useRef<HTMLElement | null>(null);

	useIntersectionObserver(sectionElRef, {
		threshold: 0.1,
		onEnter: () =>
			setNavCurrent(
				createNavData({ href: "#projects", name: "Projects" })
			),
	});

	return (
		<section id={id} className={styles.container} ref={sectionElRef}>
			<div className={styles.content}>
				<Carousel />
				<ProjectInfo />
			</div>
		</section>
	);
};

export default Projects;
