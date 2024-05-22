"use client";

import Copy, { CopyProps } from "@components/Icons/Copy";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren, useRef } from "react";

type _CopyableProps = {
	onClick?(copiedText: string): void;
	iconProps?: CopyProps;
};

export type CopyableProps = _CopyableProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _CopyableProps>;

function Copyable({ className, children, onClick, iconProps, ...props }: CopyableProps) {
	const childrenRef = useRef<HTMLDivElement | null>(null);
	const handleClick = () => {
		const copiedText = childrenRef.current!.innerText;
		navigator.clipboard.writeText(childrenRef.current!.innerText);
		onClick?.(copiedText);
	};

	let iconClassName: string | undefined;
	if (iconProps) {
		iconClassName = iconProps.className;
		delete iconProps.className;
	}

	return (
		<div {...props}>
			<div
				onClick={handleClick}
				ref={childrenRef}
				className={cn(
					`group relative z-50 flex cursor-pointer select-none gap-2`,
					className
				)}
			>
				{children}
				<div className="absolute top-0 right-0 translate-x-full -translate-y-2/4 transform">
					<Copy className={cn("!h-4 !w-4", iconClassName)} {...iconProps} />
				</div>
			</div>
		</div>
	);
}

export default Copyable;
