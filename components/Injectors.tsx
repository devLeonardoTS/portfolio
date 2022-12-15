import { ReactNode } from "react";
import { StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type InjectorsProps = {
	children: ReactNode;
};

const queryClient = new QueryClient();

const Injectors = ({ children }: InjectorsProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
		</QueryClientProvider>
	);
};

export default Injectors;
