"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

type ProvidersProps = {
	children: React.ReactNode;
	session: Session | null;
};
export default function Providers({ children, session }: ProvidersProps) {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	);
}
