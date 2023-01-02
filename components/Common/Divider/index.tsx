import React from "react";
import styles from "./Divider.module.css";

type DividerProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLHRElement>,
	HTMLHRElement
>;

const Divider = ({ ...props }: DividerProps) => {
	return (
		<React.Fragment>
			<hr className={styles.divider} {...props} />
		</React.Fragment>
	);
};

export default Divider;
