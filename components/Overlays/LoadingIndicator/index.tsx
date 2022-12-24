import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import styles from "./LoadingIndicator.module.css";

type LoadingIndicatorProps = {
	isLoading: boolean;
	id?: string;
	className?: string;
	message?: string;
};

const LoadingIndicator = ({
	isLoading = false,
	...props
}: LoadingIndicatorProps) => {
	if (isLoading) {
		return (
			<motion.div
				className={props.className ?? styles.container}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ ease: "easeInOut", duration: 0.8 }}
				{...props}
			>
				<div className={styles.content}>
					<CircularProgress />
					<p>
						<small>{props.message ?? "Loading..."}</small>
					</p>
				</div>
			</motion.div>
		);
	} else {
		return null;
	}
};

export default LoadingIndicator;
