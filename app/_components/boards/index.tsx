import React from "react";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";

import queryKeys from "_api/queryKeys";
import { useDeleteBoardMutation } from "_firebase/boards";
import { Board as BoardType } from "_types/boards";

const Board = ({ id, boardName, backgroundURL }: BoardType) => {
  const queryClient = useQueryClient();

  const { mutate: deleteBoard } = useDeleteBoardMutation();

  const handleBoardDelete = (boardId: string) => () => {
    if (!confirm("삭제하시겠습니까?")) return;
    deleteBoard(boardId);
    queryClient.refetchQueries([queryKeys.getMyBoards]);
  };

  return (
    <div className="relative w-60 h-36 hover-translucent cursor-pointer">
      <Image className="rounded-md object-cover" src={String(backgroundURL)} alt={boardName} fill={true} />
      <span className="absolute top-2 left-2 text-white text-lg">{boardName}</span>
      <AiFillDelete onClick={handleBoardDelete(String(id))} className="text-white absolute bottom-2 right-2 text-xl" />
    </div>
  );
};

export default Board;
