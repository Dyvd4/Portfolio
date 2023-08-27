import Times from "@components/Icons/Times";
import ModalIsActiveAtom from "@context/atoms/ModalIsActiveAtom";
import { cn } from "@utils/component-utils";
import { useAtom } from "jotai";
import { ComponentPropsWithRef, PropsWithChildren } from "react";

type _ModalHeaderProps = {
	onClose?(): void;
};

export type ModalHeaderProps = _ModalHeaderProps &
	Omit<PropsWithChildren<ComponentPropsWithRef<"h1">>, keyof _ModalHeaderProps>;

function ModalHeader({ className, children, ...props }: ModalHeaderProps) {
	const [, setModalIsActive] = useAtom(ModalIsActiveAtom);
	const handleClose = () => {
		props.onClose?.();
		setModalIsActive(false);
	};
	return (
		<h1
			className={cn(`flex w-[576px] items-center justify-between text-2xl text-white`, className)}
			{...props}
		>
			{children}
			{/* that's crazy but I stick with it (it works) */}
			<Times className="[&>path]:!stroke-white 
								[&:hover>path]:!stroke-yellow-400"
				onClick={handleClose}
			/>
		</h1>
	);
}

export { ModalHeader };

