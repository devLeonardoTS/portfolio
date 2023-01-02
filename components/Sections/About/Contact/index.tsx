import React from "react";
import styles from "./Contact.module.css";

type ContactProps = {
	id?: string;
};

const Contact = ({ id }: ContactProps) => {
	return (
		<div id={id} className={styles.container}>
			<div className={styles.content}>
				<div className={styles.title}>
					<h2>{"CONTACT & SNS"}</h2>
				</div>
				<div className={styles.badges}>
					<div className={styles.email}>
						<a href="mailto:leonardo.takanobu@hotmail.com">
							<img
								src="https://img.shields.io/badge/Email-leonardo.takanobu@hotmail.com-%2320232a?style=for-the-badge&labelColor=0078D4&logo=microsoft-outlook&logoColor=white"
								alt="E-mail"
							/>
						</a>
						<p>
							<small className={styles.bold}>E-MAIL</small>
						</p>
						<p>
							<small>leonardo.takanobu@hotmail.com</small>
						</p>
					</div>

					<a href="https://wa.me/5511951429364">
						<img
							src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"
							alt="WhatsApp"
						/>
					</a>

					<a href="https://www.linkedin.com/in/devleonardots/">
						<img
							src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"
							alt="Linkedin"
						/>
					</a>

					<a href="https://github.com/devLeonardoTS">
						<img
							src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
							alt="Linkedin"
						/>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Contact;
