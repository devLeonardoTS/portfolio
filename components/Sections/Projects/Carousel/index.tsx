import React from "react";

import styles from "./Carousel.module.css";
import SlidesBox from "./SlidesBox";
import SlidesNav from "./SlidesNav";

const Carousel = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<SlidesBox />
				<SlidesNav />
			</div>
		</div>
	);
};

export default Carousel;
