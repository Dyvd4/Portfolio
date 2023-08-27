import ModalIsActiveAtom from "@context/atoms/ModalIsActiveAtom";
import { cn } from "@utils/component-utils";
import { useAtom } from "jotai";
import { ComponentPropsWithRef, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type _ModalProps = {};

export type ModalProps = _ModalProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"div">>, keyof _ModalProps>;

function Modal({ className, children, ...props }: ModalProps) {
	const [modalIsActive] = useAtom(ModalIsActiveAtom);
	const [domIsReady, setDomIsReady] = useState(false);

	useEffect(() => {
		setDomIsReady(true);
	}, []);

	return (
		!!domIsReady
			? createPortal(
				<div
					className={cn(
						`border-1 absolute z-50 scale-0 transform rounded-2xl border border-[#111]
						bg-[#050505] pb-8 pl-8 pr-8 pt-6 transition-transform duration-500 ease-in-out`,
						{
							"scale-100": !!modalIsActive,
						},
						className
					)}
					{...props}
				>
					{children}
				</div>,
				document.getElementById("modal-portal")!
			)
			: null
	);
}

export default Modal;
