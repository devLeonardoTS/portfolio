import { ReactNode } from "react";
import { StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Script from "next/script";
import AssetPaths from "../data/AssetPaths";
import EnvVars from "../data/EnvVars";

type InjectorsProps = {
	children: ReactNode;
};

const queryClient = new QueryClient();

const Injectors = ({ children }: InjectorsProps) => {
	return (
		<React.Fragment>
			{EnvVars.environment === "production" ? (
				<React.Fragment>
					<Script
						id="google-analytics"
						src="https://www.googletagmanager.com/gtag/js?id=G-0T2PQ0R322"
						strategy="afterInteractive"
					/>
					<Script
						id="google-analytics-tag-mgr"
						src={AssetPaths.googleAnalyticsTagMgr}
						strategy="afterInteractive"
					/>
				</React.Fragment>
			) : null}

			<QueryClientProvider client={queryClient}>
				<StyledEngineProvider injectFirst>
					{children}
				</StyledEngineProvider>
			</QueryClientProvider>
		</React.Fragment>
	);
};

export default Injectors;
