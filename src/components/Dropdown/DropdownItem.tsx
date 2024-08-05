"use client";

import { DropdownContext } from "@components/Dropdown/Dropdown";
import { DropdownMenuContext } from "@components/Dropdown/DropdownMenu";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren, useContext } from "react";

type _DropdownItemProps = {
	id: string;
};

export type DropdownItemProps = _DropdownItemProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _DropdownItemProps>;

function DropdownItem({ className, children, id, ...props }: DropdownItemProps) {
	const { selectedOptions, setSelectedOptions } = useContext(DropdownMenuContext);
	const { setIsActive } = useContext(DropdownContext);
	delete props.onClick;
	const isActive = selectedOptions.includes(id);
	return (
		<div
			className={cn(
				`cursor-pointer rounded-lg p-2 hover:bg-gray-200`,
				{
					"bg-gray-200": isActive,
				},
				className
			)}
			onClick={() => {
				setSelectedOptions([id]);
				setIsActive(false);
			}}
			{...props}
		>
			{children}
		</div>
	);
}

export default DropdownItem;
