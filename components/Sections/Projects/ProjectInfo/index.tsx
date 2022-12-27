import { ButtonBase } from "@mui/material";
import React, { useRef } from "react";
import AssetPaths from "../../../../data/AssetPaths";
import ProjectStore from "../../../../stores/ProjectStore";
import styles from "./ProjectInfo.module.css";

type ProjectInfoProps = {};

const ProjectInfo = ({ ...props }: ProjectInfoProps) => {
	const { projects, activeProject } = ProjectStore();

	const project = projects?.[activeProject || 0] || {};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.infoCard}>
					<div className={styles.title}>
						<h1>{project.title}</h1>
					</div>
					<div className={styles.text}>
						<p>
							<span>Category: </span>
							{project.category}
						</p>
						<p>
							<span>Role: </span>
							{project.devRole}
						</p>
						<p>
							<span>Goal: </span>
							{project.objective}
						</p>
					</div>
				</div>
				<div className={styles.cta}>
					<ButtonBase>See more</ButtonBase>
				</div>
				<div className={styles.accentBox}>
					<img
						className={styles.accent_01}
						src={AssetPaths.accentProjectsDesign}
						alt="Project Info's illustration image"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProjectInfo;
