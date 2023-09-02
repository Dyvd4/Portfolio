import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useRouterLoadingState = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleStop = () => {
		setIsLoading(false);
	};

	const handleStart = () => {
		setIsLoading(true);
	};

	useEffect(() => {
		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);
	}, [router]);

	return [isLoading, setIsLoading] as const;
};

export default useRouterLoadingState;
