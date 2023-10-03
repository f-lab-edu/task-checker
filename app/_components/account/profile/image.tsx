import React, { ChangeEvent } from "react";
import Image from "next/image";

interface ProfileImagePropsType {
  selectedImageURL: string;
  imageSrc: string;
  imageAlt: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImage = ({ selectedImageURL, imageSrc, imageAlt, handleImageChange }: ProfileImagePropsType) => {
  return (
    <label className="cursor-pointer hover-translucent rounded-full p-2">
      <div className="relative w-[80px] h-[80px]">
        <Image className="object-cover rounded-full" src={selectedImageURL || imageSrc} alt={imageAlt} fill={true} />
      </div>
      <input onChange={handleImageChange} accept="image/png, image/gif, image/jpeg" className="hidden" type="file" />
    </label>
  );
};

export default ProfileImage;
