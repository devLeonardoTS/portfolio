import { useRef, useEffect } from "react";
import ProjectStore from "../../../../../stores/ProjectStore";

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

export default SlidesNavItem;
