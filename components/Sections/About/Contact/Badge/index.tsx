import React from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
	id?: string;
};

const Badge = ({ id }: BadgeProps) => {
	/** Todo: Custom Badge Component... */
	return (
		<div id={id} className={styles.container}>
			<div className={styles.content}>Badge</div>
		</div>
	);
};

export default Badge;
