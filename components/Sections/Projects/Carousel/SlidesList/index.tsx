import SmoothScrollConfig from "../../../../../configs/SmoothScrollConfig";
import ProjectStore from "../../../../../stores/ProjectStore";
import MotionSlide from "../MotionSlide";
import styles from "./SlidesList.module.css";

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

export default SlidesList;
