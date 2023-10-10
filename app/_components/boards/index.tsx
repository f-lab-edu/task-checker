import React from "react";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";

import { boardsKeys } from "_api/queryKeys/boards";
import { useDeleteBoardMutation } from "_firebase/boards";
import { Board as BoardType } from "_types/boards";
import useUserAccount from "_utils/hooks/auth";

const Board = ({ id, boardName, backgroundURL }: BoardType) => {
  const queryClient = useQueryClient();
  const userAccount = useUserAccount();

  const deleteBoard = useDeleteBoardMutation();

  const handleBoardDelete = (boardId: string) => async () => {
    if (!confirm("삭제하시겠습니까?")) return;
    await deleteBoard.mutateAsync(boardId);
    queryClient.refetchQueries(boardsKeys.my(userAccount?.uid));
  };

  return (
    <div className="relative w-60 h-36 hover-opacity-translucent cursor-pointer">
      <Image className="rounded-md object-cover" src={String(backgroundURL)} alt={boardName} fill={true} />
      <span className="absolute top-2 left-2 text-white text-lg">{boardName}</span>
      <AiFillDelete onClick={handleBoardDelete(String(id))} className="text-white absolute bottom-2 right-2 text-xl" />
    </div>
  );
};

export default Board;
