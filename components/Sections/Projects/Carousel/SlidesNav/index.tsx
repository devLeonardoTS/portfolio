import { IconButton } from "@mui/material";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SmoothScrollConfig from "../../../../../configs/SmoothScrollConfig";
import ProjectStore from "../../../../../stores/ProjectStore";
import SlidesNavItem from "../SlidesNavItem";
import styles from "./SlidesNav.module.css";

type SlidesNavProps = {};
const SlidesNav = (props: SlidesNavProps) => {
	const {
		projects,
		activeProject,
		activeProjectSlide,
		setActiveProject,
		setSlideMovedBy,
	} = ProjectStore();

	function handleMoveSlider(direction: "left" | "right") {
		// console.log("[SlidesNav::handleMoveSlider]");

		if (projects === undefined || activeProject === undefined) {
			return;
		}

		const slidesCount = projects.length;
		const nextIndex =
			activeProject === slidesCount - 1 ? 0 : activeProject + 1;
		const prevIndex =
			activeProject === 0 ? slidesCount - 1 : activeProject - 1;

		setSlideMovedBy("click");

		if (direction === "left") {
			setActiveProject(prevIndex);
		} else {
			setActiveProject(nextIndex);
		}
	}

	return (
		<div className={styles.nav}>
			<IconButton
				className={styles.button}
				onClick={() => handleMoveSlider("left")}
			>
				<BiChevronLeft />
			</IconButton>
			<ul className={styles.navList}>
				{projects
					? projects.map((p, index) => {
							return (
								<SlidesNavItem
									key={`projectSlideNavItem-${p.id}`}
									index={index}
									className={styles.item}
									onClick={() => {
										setActiveProject(index);
										setSlideMovedBy("click");
										activeProjectSlide?.scrollIntoView(
											SmoothScrollConfig
										);
									}}
								>
									<IconButton className={styles.button}>
										<span className={styles.icon} />
									</IconButton>
								</SlidesNavItem>
							);
					  })
					: null}
			</ul>
			<IconButton
				className={styles.button}
				onClick={() => handleMoveSlider("right")}
			>
				<BiChevronRight />
			</IconButton>
		</div>
	);
};

export default SlidesNav;
