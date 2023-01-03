import { motion, useAnimation, Variants } from "framer-motion";
import React, { useRef } from "react";
import AssetPaths from "../../../data/AssetPaths";
import useIntersectionObserver from "../../../hooks/useIntersectionObserver";
import NavigationStore from "../../../stores/NavigationStore";
import createNavData from "../../../utils/createNavData";
import Divider from "../../Common/Divider";
import SectionHeader from "../../Common/SectionHeader";
import styles from "./About.module.css";
import Contact from "./Contact";
import Profile from "./Profile";

type AboutProps = {
	id?: string;
};

const About = ({ id }: AboutProps) => {
	const { setNavCurrent, current, previous } = NavigationStore();
	const sectionElRef = useRef<HTMLElement | null>(null);
	const mControls = useAnimation();

	const mVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				ease: "easeInOut",
				duration: 2,
			},
		},
	};

	useIntersectionObserver(sectionElRef, {
		threshold: 0.3,
		onEnter: () => {
			setNavCurrent(createNavData({ href: "#about", name: "About" }));
			mControls.start("visible");
		},
	});

	return (
		<section id={id} className={styles.container} ref={sectionElRef}>
			<div className={styles.content}>
				<SectionHeader
					sectionTitle="About"
					contentTitle="Leonardo T. S."
					contentSubtitle="Software Engineer"
					sideIllustration={`${AssetPaths.imgBase}/about-illustration.webp`}
				/>
				<motion.div
					className={styles.textBox}
					initial={"hidden"}
					animate={mControls}
					variants={mVariants}
				>
					<Profile />
					<Divider />
					<Contact />
				</motion.div>
			</div>
		</section>
	);
};

export default About;
