import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_DELAY_MS = 250;

const useDebounce = (value, delayInMs: number = DEFAULT_DEBOUNCE_DELAY_MS) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [isDebouncing, setIsDebouncing] = useState(false);

	useEffect(() => {
		setIsDebouncing(true);

		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
			setIsDebouncing(false);
		}, delayInMs);

		return () => {
			clearTimeout(timeoutId);
			setIsDebouncing(false);
		};
	}, [value]);

	return {
		value: debouncedValue,
		isDebouncing,
	};
};

export default useDebounce;
