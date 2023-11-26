import Cookies from "js-cookie";

export const DARK_MODE_COOKIE_NAME = "darkMode";

export function toggleDarkMode() {
	if (document.documentElement.classList.contains("dark")) {
		document.documentElement.classList.remove("dark");
		Cookies.set(DARK_MODE_COOKIE_NAME, 0);
	} else {
		document.documentElement.classList.add("dark");
		Cookies.set(DARK_MODE_COOKIE_NAME, 1);
	}
}
