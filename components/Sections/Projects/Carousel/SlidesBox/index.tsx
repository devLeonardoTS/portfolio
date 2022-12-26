import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SmoothScrollConfig from "../../../../../configs/SmoothScrollConfig";
import useOnScroll from "../../../../../hooks/useOnScroll";
import ProjectStore from "../../../../../stores/ProjectStore";
import SlidesList from "../SlidesList";
import styles from "./SlidesBox.module.css";

type SlidesBoxProps = {};
const SlidesBox = (props: SlidesBoxProps) => {
	const boxRef = useRef<HTMLDivElement | null>(null);
	const { activeProjectSlide, slideMovedBy, setSlideMovedBy } =
		ProjectStore();

	const [isOnScreen, setIsOnScreen] = useState(false);

	useOnScroll(boxRef.current, {
		onScroll: () => {
			// console.log("[SlidesBox::useOnScroll::onScrollCb]");
			activeProjectSlide?.scrollIntoView(SmoothScrollConfig);
		},
		onStart: () => {
			// console.log("[SlidesBox::useOnScroll::onStartCb]");
			setSlideMovedBy("scroll");
		},
		runOnInit: true,
	});

	useEffect(() => {
		// console.log("[SlidesBox::Effect::handleOnResize] - Ran");

		function handleOnResize() {
			if (isOnScreen) {
				activeProjectSlide?.scrollIntoView(SmoothScrollConfig);
			}
		}

		window.addEventListener("resize", handleOnResize);

		return () => window.removeEventListener("resize", handleOnResize);
	}, [activeProjectSlide, isOnScreen]);

	useEffect(() => {
		// console.log("[SlidesBox::Effect::scrollToActiveProjectSlide] - Ran");
		if (isOnScreen && slideMovedBy !== "none") {
			activeProjectSlide?.scrollIntoView(SmoothScrollConfig);
		}
	}, [activeProjectSlide, isOnScreen, slideMovedBy]);

	useEffect(() => {
		// console.log("[SlidesBox::Effect::onScreenCheck] - Ran");

		const node = boxRef.current;
		if (!node) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// console.log("[SlidesBox::Effect::onScreenCheck::Enter] - Ran");
					setIsOnScreen(true);
					return;
				}

				// console.log("[SlidesBox::Effect::onScreenCheck::Leave] - Ran");
				setIsOnScreen(false);
				setSlideMovedBy("none");
			},
			{
				threshold: 0.1,
			}
		);

		observer.observe(node);

		return () => observer.disconnect();
	}, [setSlideMovedBy]);

	return (
		<motion.div
			className={styles.slidesBox}
			ref={boxRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: "easeInOut", duration: 1 }}
		>
			<SlidesList />
		</motion.div>
	);
};

export default SlidesBox;
