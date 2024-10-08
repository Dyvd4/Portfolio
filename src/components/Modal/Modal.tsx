"use client";
import LoadingCircleWithPositioning from "@components/LoadingCircleWithPositioning";
import { cn } from "@utils/component-utils";
import { ComponentPropsWithRef, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type _ModalProps = {
	isActive: boolean;
	isLoading?: boolean;
};

export type ModalProps = _ModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ModalProps>;

function Modal({ className, children, isLoading, isActive, ...props }: ModalProps) {
	const [domIsReady, setDomIsReady] = useState(false);

	useEffect(() => {
		setDomIsReady(true);
	}, []);

	if (isLoading) return <LoadingCircleWithPositioning />;

	return !!domIsReady
		? createPortal(
				<div
					className={cn(
						`border-1 absolute z-50 mx-6 flex max-h-[calc(100vh-10em)] scale-0 transform flex-col
						rounded-2xl border border-[#111] bg-[#050505] pb-8 pl-8 pr-8 pt-6 transition-transform 
						duration-500 ease-in-out sm:mx-0 md:min-w-[576px]`,
						{
							"scale-100": !!isActive,
						},
						className
					)}
					{...props}
				>
					{children}
				</div>,
				document.getElementById("modal-portal")!
			)
		: null;
}

export default Modal;
