import { H1 } from "@components/H1";
import Times from "@components/Icons/Times";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _ModalHeaderProps = {
	close(): void;
};

export type ModalHeaderProps = _ModalHeaderProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"h1">>, keyof _ModalHeaderProps>;

function ModalHeader({ className, children, close, ...props }: ModalHeaderProps) {
	return (
		<H1
			className={cn(
				`flex items-center justify-between text-2xl text-white sm:text-2xl`,
				className
			)}
			{...props}
		>
			{children}
			{/* that's crazy but I stick with it (it works) */}
			<Times
				className="[&:hover>path]:!stroke-yellow-400 
								[&>path]:!stroke-white"
				onClick={close}
			/>
		</H1>
	);
}

export { ModalHeader };
