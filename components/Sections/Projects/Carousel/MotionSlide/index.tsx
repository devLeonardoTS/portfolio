import { motion } from "framer-motion";
import React, { useRef, useImperativeHandle, useEffect } from "react";
import ProjectStore from "../../../../../stores/ProjectStore";
import styles from "./MotionSlide.module.css";

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

export default MotionSlide;
