import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _ModalFooterProps = {};

export type ModalFooterProps = _ModalFooterProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ModalFooterProps>;

function ModalFooter({ className, children, ...props }: ModalFooterProps) {
	return (
		<div className={cn(`pt-6`, className)} {...props}>
			{children}
		</div>
	);
}

export { ModalFooter };
