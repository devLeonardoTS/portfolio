import React, { ReactNode } from "react";
import styles from "./Layout.module.css";

import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.container}>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
