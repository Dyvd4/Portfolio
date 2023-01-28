import { ComponentPropsWithRef } from "react";

type LoadingCircleProps = {} & ComponentPropsWithRef<"span">

function LoadingCircle({ ...props }: LoadingCircleProps) {
	return (
		<span
			className="loading-circle
						border-black dark:border-white 
						after:border-black after:dark:border-white"
			{...props}>
		</span>
	)
}

export default LoadingCircle;