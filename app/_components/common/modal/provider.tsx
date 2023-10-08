import React from "react";
import { useAtomValue } from "jotai";

import Modal from "_components/common/modal";
import { modalAtom } from "_stores/modal";

const ModalProvider = () => {
  const modals = useAtomValue(modalAtom);

  return (
    <div>
      {modals.map((modal, idx) => (
        <Modal component={modal.component} key={idx} />
      ))}
    </div>
  );
};

export default ModalProvider;
