import config from "@config/config";
import { useRouter } from "next/router";

const { NEXT_PUBLIC_BASE_URL } = config;

const useCurrentUrl = () => {
	const router = useRouter();
	return `${NEXT_PUBLIC_BASE_URL}${router.asPath}`;
};
export default useCurrentUrl;
