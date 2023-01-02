import React from "react";
import styles from "./Profile.module.css";

type ProfileProps = {
	id?: string;
};

const Profile = ({ id }: ProfileProps) => {
	return (
		<div id={id} className={styles.container}>
			<div className={styles.content}>
				<div className={styles.txtBox}>
					<div className={styles.title}>
						<h2>{"PROFILE"}</h2>
					</div>
					<div className={styles.text}>
						<p>
							<span className={styles.bold}>
								Designer & Developer
							</span>{" "}
							of IT Systems.
						</p>
						<p>
							Owner of a certificate as{" "}
							<span className={styles.bold}>
								Systems Developer
							</span>{" "}
							from Barueri&apos;s ETEC
						</p>
						<p>
							Studies for{" "}
							<span className={styles.bold}>IT Management</span>{" "}
							at Barueri&apos;s FATEC
						</p>
						<p>Loves living in the age of information</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
