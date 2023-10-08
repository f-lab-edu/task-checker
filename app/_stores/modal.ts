import { atom } from "jotai";

import { Modal } from "_types/modal";

const modalAtom = atom<Modal[]>([]);

export { modalAtom };
