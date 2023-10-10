import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { getDownloadURL, ref } from "firebase/storage";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import { boardsKeys } from "_api/queryKeys";
import { firebaseStorage } from "_firebase";
import { uploadBackgroundImage, useCreateBoardMutation } from "_firebase/boards";
import { modalReducerAtom } from "_stores/modal";
import useUserAccount from "_utils/hooks/auth";

interface FormValues {
  boardName: string;
}

const CreateBoardModal = () => {
  const queryClient = useQueryClient();
  const userAccount = useUserAccount();

  const modalsDispatch = useSetAtom(modalReducerAtom);

  const { register, handleSubmit } = useForm<FormValues>();

  const { mutateAsync: createBoard } = useCreateBoardMutation();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageURL, setSelectedImageURL] = useState("");

  const handleBoardCreate = async (formValues: FormValues) => {
    const backgroundURL = selectedImage
      ? await (async () => {
          await uploadBackgroundImage(selectedImage);
          const storageRef = ref(firebaseStorage, `images/background/${selectedImage.name}`);
          return await getDownloadURL(storageRef);
        })()
      : process.env.NEXT_PUBLIC_DEFAULT_BACKGROUND_IMAGE_URL;

    await createBoard({ boardName: formValues.boardName, ownerUID: userAccount?.uid, backgroundURL });
    queryClient.refetchQueries(boardsKeys.my(userAccount?.uid));
    modalsDispatch({ type: "delete" });
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
    <>
      <h3 className="text-2xl mb-10">Create Board</h3>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleBoardCreate)}>
        <TextField id="boardName" label="Board Name" variant="outlined" {...register("boardName")} />
        <Button component="label" variant="contained">
          Upload Background Image
          <input
            onChange={handleImageChange}
            className="hidden"
            type="file"
            accept="image/png, image/gif, image/jpeg"
          />
        </Button>
        {selectedImage && (
          <div className="relative w-full h-[120px]">
            <Image className="object-cover" src={selectedImageURL} alt={String(selectedImage?.name)} fill={true} />
          </div>
        )}
        <div className="flex gap-5 justify-end">
          <Button color="success" type="submit" variant="contained">
            Create
          </Button>
          <Button onClick={() => modalsDispatch({ type: "delete" })} color="error" variant="contained">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateBoardModal;
