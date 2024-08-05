"use client";

import useOutsideClick from "@hooks/useOutsideClick";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, createContext, PropsWithChildren, useId, useState } from "react";

type TDropdownContext = {
	isActive: boolean;
	setIsActive(b: boolean): void;
};

const defaultValues = {
	isActive: false,
	setIsActive: (b: boolean) => {},
} as const;

export const DropdownContext = createContext<TDropdownContext>(defaultValues);

type _DropdownItemProps = object;

export type DropdownProps = _DropdownItemProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _DropdownItemProps>;

function Dropdown({ children, className, ...props }: DropdownProps) {
	const [isActive, setIsActive] = useState(false);
	const _id = useId();
	const id = _id.slice(_id.indexOf(":") + 1, _id.lastIndexOf(":"));
	useOutsideClick({
		selector: `#${id} .dropdown-trigger, #${id} .dropdown-menu`,
		handler: () => {
			setIsActive(false);
		},
	});
	return (
		<DropdownContext.Provider
			value={{
				...defaultValues,
				isActive,
				setIsActive,
			}}
		>
			<div id={id} className={cn("relative w-fit", className)} {...props}>
				{children}
			</div>
		</DropdownContext.Provider>
	);
}

export default Dropdown;
