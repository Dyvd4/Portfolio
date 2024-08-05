"use client";
import { DropdownContext } from "@components/Dropdown/Dropdown";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren, useContext } from "react";

type _DropdownTriggerProps = {};

export type DropdownTriggerProps = _DropdownTriggerProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _DropdownTriggerProps>;

function DropdownTrigger({ className, children, ...props }: DropdownTriggerProps) {
	const { isActive, setIsActive } = useContext(DropdownContext);
	delete props.onClick;
	return (
		<div
			className={cn(`dropdown-trigger`, className)}
			onClick={() => setIsActive(!isActive)}
			{...props}
		>
			{children}
		</div>
	);
}

export default DropdownTrigger;
