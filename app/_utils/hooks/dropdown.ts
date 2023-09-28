import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";

interface UseOutsideClickType {
  (el: RefObject<HTMLDivElement>, initialState: boolean): [boolean, Dispatch<SetStateAction<boolean>>];
}

const useOutsideClick: UseOutsideClickType = (el, initialState) => {
  const [isActivated, setActivated] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: Event) => {
      if (el.current !== null && !el.current.contains(e.target as Node)) {
        setActivated(!isActivated);
      }
    };
    if (isActivated) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActivated, el]);

  return [isActivated, setActivated];
};

export default useOutsideClick;
