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
		<h1
			className={cn(`flex items-center justify-between text-2xl text-white`, className)}
			{...props}
		>
			{children}
			{/* that's crazy but I stick with it (it works) */}
			<Times
				className="[&>path]:!stroke-white 
								[&:hover>path]:!stroke-yellow-400"
				onClick={close}
			/>
		</h1>
	);
}

export { ModalHeader };
