import { ReactNode } from "react";
import { atomWithReducer } from "jotai/utils";

import { Modal } from "_types/modal";

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const modalReducer = (prev: Modal[], action: { type: string; component?: ReactNode }) => {
  switch (action.type) {
    case OPEN_MODAL:
      return [...prev, { component: action.component }];
    case CLOSE_MODAL:
      return action.component ? prev.filter((modal) => modal.component !== action.component) : prev.slice(0, -1);
    default:
      return prev;
  }
};

const openModal = (component: ReactNode) => ({ type: OPEN_MODAL, component });
const closeModal = (component?: ReactNode) => ({ type: CLOSE_MODAL, component });

const modalReducerAtom = atomWithReducer([], modalReducer);

export { modalReducerAtom, openModal, closeModal };
