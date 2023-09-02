import { ComponentPropsWithRef } from "react";

type LoadingCircleProps = {} & ComponentPropsWithRef<"span">;

function LoadingCircle({ ...props }: LoadingCircleProps) {
	return (
		<span
			className="loading-circle
						border-black after:border-black 
						dark:border-white after:dark:border-white"
			{...props}
		></span>
	);
}

export default LoadingCircle;
