"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref } from "firebase/storage";

import ProfileImage from "_components/account/profile/image";
import ProfileText from "_components/account/profile/text";
import Layout from "_components/common/layout";
import { firebaseStorage } from "_firebase";
import { updateUserAccount, uploadProfileImage } from "_firebase/auth";
import useUserAccount from "_utils/hooks/auth";
import useSignStatus from "_utils/hooks/isSignedIn";

interface Profile {
  label: string;
  type: "image" | "text";
  src?: string | null;
  alt?: string | null;
  defaultValue?: string | null;
}

const AccountPage = () => {
  const { back } = useRouter();

  const userAccount = useUserAccount();
  const [isSignIn, isLoading] = useSignStatus();

  const accountProfile: Profile[] = [
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

  const getProfileComponent = (profileItem: Profile) => {
    switch (profileItem.type) {
      case "image":
        return (
          <ProfileImage
            handleImageChange={handleImageChange}
            imageAlt={String(profileItem.alt)}
            imageSrc={String(profileItem.src)}
            selectedImageURL={selectedImageURL}
          />
        );
      case "text":
        return <ProfileText displayNameRef={displayNameRef} defaultText={String(profileItem.defaultValue)} />;
    }
  };

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                {accountProfile.map((profileItem) => (
                  <div className="flex justify-between items-center" key={profileItem.label}>
                    <p className="text-sm">{profileItem.label}</p>
                    {getProfileComponent(profileItem)}
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
