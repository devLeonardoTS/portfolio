import React, { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import NavigationStore from "../../../stores/NavigationStore";
import createNavData from "../../../utils/createNavData";
import styles from "./Details.module.css";
import DetailsCard from "./DetailsCard";
import SectionHeader from "../../Common/SectionHeader";
import ProjectStore, { ProjectData } from "../../../stores/ProjectStore";
import { ButtonBase } from "@mui/material";
import PageHrefs from "../../../data/PageHrefs";
import AssetPaths from "../../../data/AssetPaths";

type DetailsProps = {
	id?: string;
};

const Details = ({ id }: DetailsProps) => {
	const { setNavCurrent } = NavigationStore();
	const { activeProject, getCurrentProject } = ProjectStore();
	const sectionElRef = useRef<HTMLElement | null>(null);

	const [project, setProject] = useState<ProjectData>();

	useEffect(() => {
		setProject(getCurrentProject());
	}, [activeProject, getCurrentProject]);

	useIntersectionObserver(sectionElRef, {
		threshold: 0.3,
		onEnter: () =>
			setNavCurrent(createNavData({ href: "#details", name: "Details" })),
	});

	return (
		<section id={id} className={styles.container} ref={sectionElRef}>
			<div className={styles.content}>
				<SectionHeader
					sectionTitle="Details"
					contentTitle={project?.title}
					sideIllustration={`${AssetPaths.imgBase}/details-illustration.webp`}
				/>
				<div className={styles.cards}>
					{project?.details ? (
						<React.Fragment>
							<DetailsCard
								key={"card-01"}
								title="Challenges"
								richText={project?.details?.challenge}
								sideImg={project?.showcaseImgs?.[0]}
							/>
							<DetailsCard
								key={"card-02"}
								title="Solutions & Conclusions"
								richText={project?.details?.solution}
								sideImg={project?.showcaseImgs?.[1]}
								isReverse
							/>
							<DetailsCard
								key={"card-03"}
								title="Features"
								richText={project?.details?.features}
								sideImg={project?.showcaseImgs?.[2]}
							/>
							<DetailsCard
								key={"card-04"}
								title="Colaborators"
								richText={project?.details?.colaborators}
								sideImg={project?.showcaseImgs?.[3]}
								isReverse
							/>
							<div className={styles.cta}>
								<a href={project.page || PageHrefs.home}>
									<ButtonBase>Access Project</ButtonBase>
								</a>
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<DetailsCard
								key={"card-00"}
								title="Work in Progress"
								richText={`<p>&#128119; This project is still under development, check my <a href="https://github.com/devLeonardoTS" class=${styles.link}>GitHub</a> to learn about how it is going.</p>`}
								isReverse
							/>

							<div className={styles.cta}>
								<a href={"https://github.com/devLeonardoTS"}>
									<ButtonBase>Check GitHub</ButtonBase>
								</a>
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</section>
	);
};

export default Details;
