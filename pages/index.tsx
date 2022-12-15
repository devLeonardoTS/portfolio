import Head from "next/head";
import { Fragment } from "react";
import About from "../components/Sections/About";
import Details from "../components/Sections/Details";
import Projects from "../components/Sections/Projects";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<Fragment>
			<Head>
				<title>{"DevLTS Portfolio - Home"}</title>
				<meta
					name="description"
					content={
						"Welcome to my portfolio page, glad to see you here."
					}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.container}>
				<Projects id="projects" />
				<Details id="details" />
				<About id="about" />
			</main>
		</Fragment>
	);
}
