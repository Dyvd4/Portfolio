import { StandardLonghandProperties } from "csstype";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type TooltipProps = PropsWithChildren<{
	title: string;
	direction?: "up" | "down" | "left" | "right";
}> &
	ComponentPropsWithRef<"div">;

function useTooltipPositionStyle(direction: TooltipProps["direction"]) {
	const translate = {
		x: "0%",
		y: "0%",
	};

	const positionStyle: StandardLonghandProperties = {
		transform: undefined,
	};

	switch (direction) {
		case "up":
			translate.x = "-50%";
			translate.y = "-100%";
			positionStyle.left = "50%";
			break;
		case "down":
			translate.y = "100%";
			translate.x = "-50%";
			positionStyle.left = "50%";
			break;
		case "right":
			translate.x = "100%";
			translate.y = "0%";
			positionStyle.right = "0%";
			break;
		case "left":
			translate.x = "-100%";
			translate.y = "0%";
			positionStyle.left = "0%";
			break;
	}

	positionStyle.transform = `translate(${translate.x}, ${translate.y})`;
	return positionStyle;
}

function Tooltip({ children, direction = "up", title, ...props }: TooltipProps) {
	const positionStyle = useTooltipPositionStyle(direction);

	return (
		<span className="group relative cursor-pointer" {...props}>
			<span
				style={positionStyle}
				className={`invisible absolute z-50 transform
							whitespace-nowrap rounded-lg bg-black p-2 text-center
							text-sm font-bold text-white opacity-0
							transition-all duration-300 group-hover:visible group-hover:opacity-100`}
			>
				{title}
			</span>
			<span
				className="z-100 relative flex 
							items-center justify-center"
			>
				{children}
			</span>
		</span>
	);
}

export default Tooltip;
