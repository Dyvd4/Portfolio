import { useEffect, useState } from "react";

const useDarkModeIsActive = () => {
  const [darkModeIsActive, setDarkModeIsActive] = useState(false);

  const handleObserve = (mutations: MutationRecord[]) => {
    let darkModeIsActive = false;
    mutations.forEach((mutation) => {
      if (mutation.target.nodeType === Node.ELEMENT_NODE) {
        darkModeIsActive = (mutation.target as HTMLElement).classList.contains(
          "dark"
        );
      }
    });
    setDarkModeIsActive(darkModeIsActive);
  };

  useEffect(() => {
    const observer = new MutationObserver(handleObserve);
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  return darkModeIsActive;
};
export default useDarkModeIsActive;
