import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import styles from "./LoadingIndicator.module.css";

type LoadingIndicatorProps = {
	id?: string;
	isLoading: boolean;
};

const LoadingIndicator = ({
	isLoading = false,
	...props
}: LoadingIndicatorProps) => {
	if (isLoading) {
		return (
			<motion.div
				className={styles.container}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ ease: "easeInOut", duration: 0.8 }}
				{...props}
			>
				<div className={styles.content}>
					<CircularProgress />
					<p>
						<small>Loading...</small>
					</p>
				</div>
			</motion.div>
		);
	} else {
		return null;
	}
};

export default LoadingIndicator;
