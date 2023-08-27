import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _ModalBodyProps = {};

export type ModalBodyProps = _ModalBodyProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ModalBodyProps>;

function ModalBody({ className, children, ...props }: ModalBodyProps) {
	return (
		<div className={cn(`pt-6`, className)} {...props}>
			{children}
		</div>
	);
}

export { ModalBody };
