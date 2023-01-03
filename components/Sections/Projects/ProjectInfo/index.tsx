import { ButtonBase } from "@mui/material";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import SmoothScrollConfig from "../../../../configs/SmoothScrollConfig";
import AssetPaths from "../../../../data/AssetPaths";
import ProjectStore from "../../../../stores/ProjectStore";
import NavLink from "../../../NavLink";
import styles from "./ProjectInfo.module.css";

type ProjectInfoProps = {};

const ProjectInfo = ({ ...props }: ProjectInfoProps) => {
	const { projects, activeProject } = ProjectStore();

	const project = projects?.[activeProject || 0] || {};

	const handleSeeMoreClick: React.MouseEventHandler<
		HTMLAnchorElement
	> = ev => {
		ev.preventDefault();
		const detailsNode = document.getElementById("details");
		if (detailsNode) {
			detailsNode.scrollIntoView(SmoothScrollConfig);
		}
	};

	return (
		<div className={styles.container}>
			<motion.div
				className={styles.content}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ ease: "easeInOut", duration: 1 }}
			>
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
					<NavLink
						onClick={ev => handleSeeMoreClick(ev)}
						href="#details"
					>
						<ButtonBase>See more</ButtonBase>
					</NavLink>
				</div>
				<div className={styles.accentBox}>
					<img
						className={styles.accent_01}
						src={AssetPaths.accentProjectsDesign}
						alt=""
					/>
				</div>
			</motion.div>
		</div>
	);
};

export default ProjectInfo;
