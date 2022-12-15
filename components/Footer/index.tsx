import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.container}>
			<div className={styles.content}>
				<a href="https://github.com/devLeonardoTS/portfolio">
					<small>© 2022 - DevLTS.</small>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
