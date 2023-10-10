import { ReactNode } from "react";
import { atomWithReducer } from "jotai/utils";

import { Modal } from "_types/modal";

const modalReducer = (prev: Modal[], action: { type: "add" | "delete"; component?: ReactNode }) => {
  if (action.type === "add") return [...prev, { component: action.component }];
  if (action.type === "delete")
    return action.component ? prev.filter((modal) => modal.component !== action.component) : prev.slice(0, -1);
  throw new Error("unknown action type");
};

const modalReducerAtom = atomWithReducer([], modalReducer);

export { modalReducerAtom };
