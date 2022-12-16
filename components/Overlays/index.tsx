import usePageUnloadIndicator from "../../hooks/usePageUnloadIndicator";
import LoadingIndicator from "./LoadingIndicator";
import styles from "./Overlays.module.css";

type OverlaysProps = {};

const Overlays = ({}: OverlaysProps) => {
	const { isLoading } = usePageUnloadIndicator();

	return (
		<div className={styles.container}>
			<LoadingIndicator isLoading={isLoading} />
		</div>
	);
};

export default Overlays;
