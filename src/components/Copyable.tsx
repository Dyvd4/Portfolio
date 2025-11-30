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
	let copyIconProps: _CopyableProps["iconProps"];
	if (iconProps) {
		copyIconProps = { ...iconProps };
		iconClassName = copyIconProps.className;
		delete copyIconProps.className;
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
				<div className="absolute right-0 top-0 -translate-y-2/4 translate-x-full transform">
					<Copy className={cn("h-4! w-4!", iconClassName)} {...copyIconProps} />
				</div>
			</div>
		</div>
	);
}

export default Copyable;
