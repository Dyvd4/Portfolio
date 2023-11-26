import { DARK_MODE_COOKIE_NAME } from "@utils/dark-mode-utils";
import { cookies } from "next/headers";

export const useDarkModeIsActive = () => {
	const darkModeIsActive = Boolean(parseInt(cookies().get(DARK_MODE_COOKIE_NAME)?.value || "0"));
	return darkModeIsActive;
};
export default useDarkModeIsActive;
