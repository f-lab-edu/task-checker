import React, { ReactNode } from "react";

interface DropdownPropsType {
  isActivated: boolean;
  children: ReactNode;
}

const Dropdown = ({ isActivated, children }: DropdownPropsType) => {
  return (
    <div className={`absolute bg-stone-400 rounded-md w-max right-0 p-2 scroll-x ${isActivated ? "block" : "hidden"}`}>
      {children}
    </div>
  );
};

export default Dropdown;
