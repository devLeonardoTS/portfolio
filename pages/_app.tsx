import "../styles/globals.css";

import type { AppProps } from "next/app";
import Injectors from "../components/Injectors";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Injectors>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Injectors>
	);
}
