import { useState } from "react";

const useModalDisclosure = () => {
  const [modalIsActive, setModalIsActive] = useState(false);
  return {
    isActive: modalIsActive,
    open: () => setModalIsActive(true),
    close: () => setModalIsActive(false),
  };
};

export default useModalDisclosure;
