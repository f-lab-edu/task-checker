import React, { ReactNode } from "react";
import { useSetAtom } from "jotai";
import MuiModal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { modalAtom } from "_stores/modal";

interface ModalPropsType {
  component: ReactNode;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  pt: 3,
  px: 4,
  pb: 5,
};

const Modal = ({ component }: ModalPropsType) => {
  const setModals = useSetAtom(modalAtom);

  return (
    <MuiModal
      open={true}
      onClose={() => setModals((prev) => prev.slice(0, -1))}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>{component}</Box>
    </MuiModal>
  );
};

export default Modal;
