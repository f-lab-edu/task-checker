import React, { RefObject } from "react";

interface ProfileTextPropsType {
  displayNameRef: RefObject<HTMLInputElement>;
  defaultText: string;
}

const ProfileText = ({ displayNameRef, defaultText }: ProfileTextPropsType) => {
  return <input ref={displayNameRef} className="text-right border rounded-md px-2 py-1" defaultValue={defaultText} />;
};

export default ProfileText;
