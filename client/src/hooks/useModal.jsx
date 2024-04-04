import { useState } from "react";

export default function useModal() {
  const [openModal, setOpenModal] = useState(false);
  const changeModalState = () => {
    setOpenModal(!openModal);
  };
  return [openModal, changeModalState];
}
