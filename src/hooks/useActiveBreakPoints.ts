"use client";
import { useEffect, useState } from "react";

/** inverse determines whether if the breakpoint should be triggered on "max-width" instead of "min-width" */
const useActiveBreakPoints = (inverse?: boolean) => {
	const breakpointCondition = inverse ? "max-width" : "min-width";
	const [sm, setSmIsActive] = useState(false);
	const [md, setMdIsActive] = useState(false);
	const [lg, setLgIsActive] = useState(false);
	const [xl, setXlIsActive] = useState(false);
	const [twoXl, setTwoXlIsActive] = useState(false);
	const [loaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const smMediaQuery = window.matchMedia(`(${breakpointCondition}: 640px)`);
		smMediaQuery.addEventListener("change", () => {
			setSmIsActive(smMediaQuery.matches);
		});
		const mdMediaQuery = window.matchMedia(`(${breakpointCondition}: 768px)`);
		mdMediaQuery.addEventListener("change", () => {
			setMdIsActive(mdMediaQuery.matches);
		});
		const lgMediaQuery = window.matchMedia(`(${breakpointCondition}: 1024px)`);
		lgMediaQuery.addEventListener("change", () => {
			setLgIsActive(lgMediaQuery.matches);
		});
		const xlMediaQuery = window.matchMedia(`(${breakpointCondition}: 1280px`);
		xlMediaQuery.addEventListener("change", () => {
			setXlIsActive(xlMediaQuery.matches);
		});
		const twoXlMediaQuery = window.matchMedia(`(${breakpointCondition}: 1536px)`);
		twoXlMediaQuery.addEventListener("change", () => {
			setTwoXlIsActive(twoXlMediaQuery.matches);
		});
		setSmIsActive(smMediaQuery.matches);
		setMdIsActive(mdMediaQuery.matches);
		setLgIsActive(lgMediaQuery.matches);
		setXlIsActive(xlMediaQuery.matches);
		setTwoXlIsActive(twoXlMediaQuery.matches);
		setIsLoaded(true);
	}, []);

	return {
		sm,
		md,
		lg,
		xl,
		twoXl,
		loaded,
	};
};
export default useActiveBreakPoints;
