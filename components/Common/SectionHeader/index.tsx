import React from "react";
import AssetPaths from "../../../data/AssetPaths";
import Divider from "../Divider";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
	id?: string;
	sectionTitle?: string;
	sideIllustration?: string;
	contentTitle?: string;
	contentSubtitle?: string;
};

const SectionHeader = ({
	id,
	sectionTitle,
	sideIllustration,
	contentTitle,
	contentSubtitle,
}: SectionHeaderProps) => {
	return (
		<div id={id} className={styles.container}>
			<div className={styles.content}>
				<div className={styles.sectionTitle}>
					<div className={styles.txtBox}>
						<h2>{sectionTitle || "Section Title"}</h2>
					</div>
					<div className={styles.illustration}>
						<img
							src={
								sideIllustration ||
								AssetPaths.slidePlaceholderImg
							}
							alt=""
						/>
					</div>
				</div>
				<div className={styles.contentTitle}>
					<div className={styles.txtBox}>
						{contentTitle && <h2>{contentTitle}</h2>}
						{contentSubtitle && <h3>{contentSubtitle}</h3>}
					</div>
					<Divider />
				</div>
			</div>
		</div>
	);
};

export default SectionHeader;
