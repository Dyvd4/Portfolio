import { DARK_MODE_COOKIE_NAME } from "@utils/dark-mode-utils";
import { cookies } from "next/headers";

export const getDarkModeIsActive = async () => {
	const cookieStore = await cookies();
	const darkModeIsActive = Boolean(
		parseInt(cookieStore.get(DARK_MODE_COOKIE_NAME)?.value || "0")
	);
	return darkModeIsActive;
};
