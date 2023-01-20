import Cookies from "js-cookie";

const darkModeCookieName = "darkMode"

export function toggleDarkMode() {
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        Cookies.set(darkModeCookieName, 0);
    }
    else {
        document.documentElement.classList.add("dark");
        Cookies.set(darkModeCookieName, 1);
    }
}

export function applyDarkMode() {

    const isDarkMode = Boolean(parseInt(Cookies.get(darkModeCookieName)));

    if (isDarkMode) {
        document.documentElement.classList.add("dark");
    }
    else {
        document.documentElement.classList.remove("dark");
    }
}