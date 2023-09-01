import ModalIsActiveAtom from "@context/atoms/ModalIsActiveAtom";
import { useAtom } from "jotai";

const useModalDisclosure = () => {
  const [modalIsActive, setModalIsActive] = useAtom(ModalIsActiveAtom);
  return {
    isActive: modalIsActive,
    open: () => setModalIsActive(true),
    close: () => setModalIsActive(false),
  };
};

export default useModalDisclosure;
