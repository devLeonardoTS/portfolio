import { motion, useAnimation, Variants } from "framer-motion";
import React, { useEffect, useRef } from "react";
import AssetPaths from "../../../../data/AssetPaths";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import styles from "./DetailsCard.module.css";

type DetailsCardProps = {
	id?: string;
	index?: number;
	title?: string;
	richText?: string;
	sideImg?: string;
	isReverse?: boolean;
};

const DetailsCard = ({
	id,
	index,
	title,
	richText,
	sideImg,
	isReverse,
}: DetailsCardProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const contentBoxRef = useRef<HTMLDivElement | null>(null);
	const mControls = useAnimation();

	const mVariants: Variants = {
		hidden: { opacity: 0, translateX: isReverse ? "-95%" : "95%" },
		visible: {
			opacity: 1,
			translateX: "0%",
			transition: {
				ease: "easeInOut",
				duration: 1,
			},
		},
	};

	useEffect(() => {
		if (isReverse) {
			contentBoxRef.current?.classList.add(styles.reverse);
		} else {
			contentBoxRef.current?.classList.remove(styles.reverse);
		}
	}, [isReverse]);

	useEffect(() => {
		// console.log("[DetailsCard::Effect::onScreenCheck] - Ran");

		const node = containerRef.current;
		if (!node) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// console.log("[DetailsCard::Effect::onScreenCheck::Enter] - Ran");
					mControls.start("visible");
					return;
				}

				// console.log("[DetailsCard::Effect::onScreenCheck::Leave] - Ran");
				// mControls.start("hidden");
			},
			{
				threshold: 0.01,
			}
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, [mControls]);

	return (
		<motion.div
			id={id}
			className={styles.container}
			ref={containerRef}
			initial={"hidden"}
			animate={mControls}
			variants={mVariants}
		>
			<div className={styles.content} ref={contentBoxRef}>
				<div className={styles.txtBox}>
					<h3>{title || "Title"}</h3>
					{richText ? (
						<div
							dangerouslySetInnerHTML={{
								__html: richText,
							}}
						/>
					) : null}
				</div>
				<div className={styles.sideImgBox}>
					<img
						src={sideImg || AssetPaths.slidePlaceholderImg}
						alt="Illustration Image"
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default DetailsCard;
