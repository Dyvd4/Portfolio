import ModalIsActiveAtom from "@context/atoms/ModalPortalIsActiveAtom";
import { useAtom } from "jotai";
import { useState } from "react";

const useModalDisclosure = () => {
	const [isActive, setIsActive] = useState(false);
	const [, setModalPortalActive] = useAtom(ModalIsActiveAtom);
	const open = () => {
		setIsActive(true);
		setModalPortalActive(true);
	};
	const close = () => {
		setIsActive(false);
		setModalPortalActive(false);
	};
	return {
		isActive: isActive,
		open,
		close,
	};
};

export default useModalDisclosure;
