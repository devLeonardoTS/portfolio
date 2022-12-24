import { IconButton } from "@mui/material";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SmoothScrollConfig from "../../../../configs/SmoothScrollConfig";
import ProjectStore from "../../../../stores/ProjectStore";
import { Optional } from "../../../../types/Nullables";
import { motion } from "framer-motion";
import styles from "./Carousel.module.css";

type SlideProps = React.DetailedHTMLProps<
	React.LiHTMLAttributes<HTMLLIElement>,
	HTMLLIElement
> & {
	index: number;
};
const Slide = React.forwardRef(
	({ index, ...props }: SlideProps, forwardedRef) => {
		const elRef = useRef<HTMLLIElement | null>(null);
		const {
			slideMovedBy,
			activeProject,
			setActiveProject,
			setActiveProjectSlide,
		} = ProjectStore();

		useImperativeHandle(forwardedRef, () => elRef.current);

		useEffect(() => {
			function onChangeActiveProject() {
				const node = elRef.current;
				if (!node) {
					return;
				}
				const isActive = index === activeProject;

				if (isActive) {
					node.dataset["active"] = "";
					setActiveProjectSlide(node);
					// console.log("[Slide::Effect::onChangeActiveProject]");
				} else {
					delete node.dataset.active;
				}
			}

			onChangeActiveProject();
		}, [activeProject, index, setActiveProjectSlide]);

		useEffect(() => {
			function initObserver() {
				const node = elRef.current;
				if (!node) {
					return;
				}

				const observer = new IntersectionObserver(
					([entry]) => {
						function onIntersect() {
							// console.log("[Slide::Effect::onIntersect] ", {
							// 	slideMovedBy,
							// });

							if (slideMovedBy === "scroll") {
								if (node) {
									setActiveProject(index);
									setActiveProjectSlide(node);
								}
							}
						}

						if (entry.isIntersecting) {
							onIntersect();
						}
					},
					{ threshold: 0.5 }
				);

				observer.observe(node);

				return observer;
			}

			const observer = initObserver();

			return () => observer?.disconnect();
		}, [index, setActiveProject, setActiveProjectSlide, slideMovedBy]);

		return (
			<li {...props} ref={elRef}>
				{props.children}
			</li>
		);
	}
);

Slide.displayName = "Slide";

const MotionSlide = motion(Slide);

type SlidesListProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLUListElement>,
	HTMLUListElement
>;
const SlidesList = ({ ...props }: SlidesListProps) => {
	const { projects, activeProject, setActiveProject, setActiveProjectSlide } =
		ProjectStore();

	return (
		<ul className={styles.slides} {...props}>
			{projects
				? projects.map((project, index) => {
						const isActive = index === activeProject;

						return (
							<MotionSlide
								key={`projectSlide-${project.id}`}
								index={index}
								className={styles.item}
								onClick={ev => {
									setActiveProject(index);
									setActiveProjectSlide(ev.currentTarget);
									ev.currentTarget.scrollIntoView(
										SmoothScrollConfig
									);
								}}
								initial={{ scale: 0.7 }}
								{...{
									animate: isActive
										? { scale: 0.9 }
										: undefined,
								}}
								transition={{
									ease: "easeInOut",
									duration: 0.5,
								}}
							>
								<img
									src={project.heroImg}
									alt={`Project Image ${index + 1}`}
								/>
							</MotionSlide>
						);
				  })
				: null}
		</ul>
	);
};

type UseOnScroll = (
	node: HTMLElement | null,
	args: Optional<{
		onScroll: () => Promise<void> | void;
		onStart: () => Promise<void> | void;
		onEnd: () => Promise<void> | void;
		runOnInit: boolean;
		delay: number;
	}>
) => Promise<void> | void;

const useOnScroll: UseOnScroll = (
	node,
	{
		onScroll = undefined,
		onStart = undefined,
		onEnd = undefined,
		runOnInit = false,
		delay = 150,
	}
) => {
	const [timer, setTimer] = useState<NodeJS.Timeout>();

	useEffect(() => {
		if (!onScroll) {
			return;
		}

		// console.log("[useOnScroll::Effect::handleOnScroll] - Ran");

		function handleOnScroll() {
			setTimer(
				setTimeout(() => {
					onScroll?.();
				}, delay)
			);
		}

		if (runOnInit && !timer) {
			onScroll?.();
		}

		node?.addEventListener("scroll", handleOnScroll);

		return () => {
			node?.removeEventListener("scroll", handleOnScroll);
			clearTimeout(timer);
		};
	}, [delay, node, onScroll, runOnInit, timer]);

	useEffect(() => {
		if (!onStart) {
			return;
		}

		// console.log("[useOnScroll::Effect::handleOnStart] - Ran");

		function handleOnStart() {
			onStart?.();
		}

		node?.addEventListener("touchstart", handleOnStart);
		node?.addEventListener("mousedown", handleOnStart);

		return () => {
			node?.removeEventListener("touchstart", handleOnStart);
			node?.removeEventListener("mousedown", handleOnStart);
		};
	}, [node, onStart]);

	useEffect(() => {
		if (!onEnd) {
			return;
		}

		// console.log("[useOnScroll::Effect::handleOnEnd] - Ran");

		function handleOnEnd() {
			onEnd?.();
		}

		node?.addEventListener("touchend", handleOnEnd);
		node?.addEventListener("mouseup", handleOnEnd);

		return () => {
			node?.removeEventListener("touchend", handleOnEnd);
			node?.removeEventListener("mouseup", handleOnEnd);
		};
	}, [node, onEnd]);
};

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

type SlidesNavItemProps = React.DetailedHTMLProps<
	React.LiHTMLAttributes<HTMLLIElement>,
	HTMLLIElement
> & {
	index: number;
};
const SlidesNavItem = ({ index, ...props }: SlidesNavItemProps) => {
	const elRef = useRef<HTMLLIElement | null>(null);

	const { activeProject, setActiveProjectSlide } = ProjectStore();

	useEffect(() => {
		function onChangeActiveProject() {
			const node = elRef.current;
			if (!node) {
				return;
			}
			const isActive = index === activeProject;

			if (isActive) {
				node.dataset["active"] = "";
				// console.log("[SlidesNavItem::Effect::onChangeActiveProject]");
			} else {
				delete node.dataset.active;
			}
		}

		onChangeActiveProject();
	}, [activeProject, index, setActiveProjectSlide]);

	return (
		<li {...props} ref={elRef}>
			{props.children}
		</li>
	);
};

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
