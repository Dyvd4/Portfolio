import { StandardLonghandProperties } from 'csstype';
import { ComponentPropsWithRef, PropsWithChildren, useState } from 'react';

type TooltipProps = PropsWithChildren<{
	title: string
	direction?: "up" | "down" | "left" | "right"
}> & ComponentPropsWithRef<"div">

function useTooltipPositionStyle(direction: TooltipProps["direction"]) {

	const translate = {
		x: "0%",
		y: "0%"
	}

	const positionStyle: StandardLonghandProperties = {
		transform: undefined
	}

	switch (direction) {
		case "up":
			translate.x = "-50%";
			translate.y = "-100%"
			positionStyle.left = "50%"
			break;
		case "down":
			translate.y = "100%";
			translate.x = "-50%"
			positionStyle.left = "50%"
			break;
		case "right":
			translate.x = "100%";
			translate.y = "0%";
			positionStyle.right = "0%"
			break;
		case "left":
			translate.x = "-100%";
			translate.y = "0%";
			positionStyle.left = "0%"
			break;
	}

	positionStyle.transform = `translate(${translate.x}, ${translate.y})`
	return positionStyle;
}

function Tooltip({ children, direction = "up", title, ...props }: TooltipProps) {

	const [isActive, setIsActive] = useState(false);
	const positionStyle = useTooltipPositionStyle(direction);

	return (
		<span
			className="relative cursor-pointer"
			{...props}>
			<span
				style={positionStyle}
				className={`${isActive ? "opacity-100" : "opacity-0"}
							transition-opacity bg-black text-white
							text-center font-bold text-sm absolute
							p-2 rounded-lg whitespace-nowrap transform`}>
				{title}
			</span>
			<span
				onMouseOut={() => setIsActive(false)}
				onMouseOver={() => setIsActive(true)}
				className="inline-flex justify-center items-center 
							relative z-100 ">
				{children}
			</span>
		</span>
	);
}

export default Tooltip;