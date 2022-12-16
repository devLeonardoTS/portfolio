import React, { ReactNode } from "react";

import Footer from "./Footer";
import styles from "./Layout.module.css";
import Navbar from "./Navbar";
import Overlays from "./Overlays";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.container}>
			<Navbar />
			{children}
			<Footer />
			<Overlays />
		</div>
	);
};

export default Layout;
