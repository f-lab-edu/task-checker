"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref } from "firebase/storage";

import Layout from "_components/common/layout";
import { firebaseStorage } from "_firebase";
import { updateUserAccount, uploadProfileImage } from "_firebase/auth";
import useUserAccount from "_utils/hooks/auth";
import useSignStatus from "_utils/hooks/isSignedIn";

const AccountPage = () => {
  const { back } = useRouter();

  const userAccount = useUserAccount();
  const [isSignIn, isLoading] = useSignStatus();

  const accountProfileInfos = [
    {
      label: "Profile Image",
      type: "image",
      src: userAccount?.photoURL,
      alt: userAccount?.displayName,
    },
    {
      label: "Display Name",
      type: "text",
      defaultValue: userAccount?.displayName,
    },
  ];

  const displayNameRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageURL, setSelectedImageURL] = useState("");

  const handleAccountEdit = async () => {
    const photoURL = selectedImage
      ? await (async () => {
          await uploadProfileImage({ file: selectedImage });
          const storageRef = ref(firebaseStorage, `images/profile/${selectedImage.name}`);
          return await getDownloadURL(storageRef);
        })()
      : String(userAccount?.photoURL);

    await updateUserAccount({ displayName: String(displayNameRef.current?.value), photoURL });
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files && e.target.files[0];

    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImageURL(String(e.target?.result));
    };
    reader.readAsDataURL(imageFile);
    setSelectedImage(imageFile);
  };

  return (
    <Layout hasHeader={true} isRequiredSignedIn={true}>
      <div className="flex justify-center bg-stone-100">
        <div className="w-[32rem] shadow-md h-[calc(100vh-64px)] bg-white py-10 px-10">
          {!isLoading && isSignIn && (
            <>
              <h1 className="text-2xl">Manage Account</h1>
              <div className="mt-20 flex flex-col gap-10">
                {accountProfileInfos.map((el) => (
                  <div className="flex justify-between items-center" key={el.label}>
                    <p className="text-sm">{el.label}</p>
                    {el.type === "image" ? (
                      <label className="cursor-pointer hover-translucent rounded-full p-2">
                        <div className="relative w-[80px] h-[80px]">
                          <Image
                            className="object-cover rounded-full"
                            src={selectedImageURL || String(el.src)}
                            alt={String(el.alt)}
                            fill={true}
                          />
                        </div>
                        <input
                          onChange={handleChangeImage}
                          accept="image/png, image/gif, image/jpeg"
                          className="hidden"
                          type="file"
                        />
                      </label>
                    ) : el.type === "text" ? (
                      <input
                        ref={displayNameRef}
                        className="text-right border rounded-md px-2 py-1"
                        defaultValue={String(el.defaultValue)}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="flex justify-center gap-2 mt-20">
            <button
              onClick={handleAccountEdit}
              className="border border-stone-400 py-1 px-2 rounded-md hover-translucent"
            >
              Edit
            </button>
            <button onClick={back} className="border border-stone-400 py-1 px-2 rounded-md hover-translucent">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
