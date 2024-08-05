import { useEffect } from "react";

type UseOutsideClickArgs = {
	/** A CSS selector string used to identify the elements to be monitored for outside clicks.
	 * This string can match one or more elements in the document.
	 * When a click occurs outside all of these matched elements,
	 * the provided `handler` function is invoked.
	 * This allows for complex selection of elements,
	 * enabling the hook to track clicks relative to multiple or nested elements on the page */
	selector: string;
	handler: () => void;
};
const useOutsideClick = ({ selector, handler }: UseOutsideClickArgs) => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const elements = Array.from(document.querySelectorAll(selector));
			const isOutsideClick = elements.every((element) => {
				const rect = element.getBoundingClientRect();
				const isOutsideClick = !(
					rect.top <= e.clientY &&
					e.clientY <= rect.bottom &&
					rect.left <= e.clientX &&
					e.clientX <= rect.right
				);
				return isOutsideClick;
			});
			if (isOutsideClick) {
				handler();
			}
		};
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, []);
};

export default useOutsideClick;
