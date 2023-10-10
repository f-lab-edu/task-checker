import React from "react";
import { useAtomValue } from "jotai";

import Modal from "_components/common/modal";
import { modalReducerAtom } from "_stores/modal";

const ModalProvider = () => {
  const modals = useAtomValue(modalReducerAtom);

  return (
    <div>
      {modals.map((modal, idx) => (
        <Modal component={modal.component} key={idx} />
      ))}
    </div>
  );
};

export default ModalProvider;
