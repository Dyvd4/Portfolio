"use client";

import { DropdownContext } from "@components/Dropdown/Dropdown";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, createContext, PropsWithChildren, useContext } from "react";

type TDropdownMenuContext = {
	selectedOptions: string[];
	setSelectedOptions(s: string[]): void;
};
export const DropdownMenuContext = createContext<TDropdownMenuContext>({
	selectedOptions: [] as string[],
	setSelectedOptions: (s: string[]) => {},
});

type _DropdownMenuProps = TDropdownMenuContext;

export type DropdownMenuProps = _DropdownMenuProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _DropdownMenuProps>;

function DropdownMenu({
	className,
	children,
	selectedOptions,
	setSelectedOptions,
	...props
}: DropdownMenuProps) {
	const { isActive } = useContext(DropdownContext);
	return (
		<DropdownMenuContext.Provider
			value={{
				selectedOptions,
				setSelectedOptions,
			}}
		>
			<div
				className={cn(
					`
					dropdown-menu
					invisible
					absolute
					bottom-0 
					right-0 
					flex 
					translate-y-[104%] 
					scale-95 
					transform
					flex-col 
					gap-2 
					rounded-lg 
					border 
					p-2 
					opacity-0
					transition-all`,
					{
						"visible scale-100 opacity-100 duration-200": isActive,
					},
					className
				)}
				{...props}
			>
				{children}
			</div>
		</DropdownMenuContext.Provider>
	);
}

export default DropdownMenu;
