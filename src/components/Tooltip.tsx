import { StandardLonghandProperties } from 'csstype';
import { ComponentPropsWithRef, PropsWithChildren, useState } from 'react';

type TooltipProps = PropsWithChildren<{
	title: string
	direction: "up" | "down" | "left" | "right"
}> & ComponentPropsWithRef<"div">

function useTooltipTransformStyle(direction: TooltipProps["direction"]) {

	let transformStyle: { transform: StandardLonghandProperties["transform"] } = {
		transform: undefined
	}

	const position = {
		x: "0%",
		y: "0%"
	}

	switch (direction) {
		case "down":
			position.y = "100%";
			transformStyle = {
				transform: `translate(${position.x}, ${position.y})`
			};
			break;
		case "right":
			position.x = "100%";
			position.y = "0%";
			transformStyle = {
				transform: `translate(${position.x}, ${position.y})`
			};
			break;
		case "left":
			position.x = "-100%";
			position.y = "0%";
			transformStyle = {
				transform: `translate(${position.x}, ${position.y})`
			};
			break;
	}

	return transformStyle;
}

function Tooltip({ children, direction, title, ...props }: TooltipProps) {

	const [isActive, setIsActive] = useState(false);
	const transformStyle = useTooltipTransformStyle(direction);

	return (
		<div
			className="flex flex-col gap-2 items-center cursor-pointer"
			{...props}>
			<div
				style={transformStyle}
				className={`${isActive ? "opacity-100" : "opacity-0"} 
							transition-opacity text-white bg-black
							absolute text-center font-bold text-sm
							p-2 rounded-lg whitespace-nowrap
							-translate-y-full translate-x-0`}>
				{title}
			</div>
			<div
				onMouseOut={() => setIsActive(false)}
				onMouseOver={() => setIsActive(true)}
				className="flex justify-center items-center 
							relative z-100 ">
				{children}
			</div>
		</div>
	);
}

export default Tooltip;