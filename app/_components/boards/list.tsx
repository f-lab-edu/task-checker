import React from "react";
import { useSetAtom } from "jotai";
import { Button } from "@mui/material";

import Board from "_components/boards";
import CreateBoardModal from "_components/boards/createModal";
import { useGetMyBoardsQuery } from "_firebase/boards";
import { modalReducerAtom } from "_stores/modal";
import useUserAccount from "_utils/hooks/auth";

const BoardsList = () => {
  const userAccount = useUserAccount();
  const modalsDispatch = useSetAtom(modalReducerAtom);

  const { data: myBoards } = useGetMyBoardsQuery(userAccount?.uid);

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>Number of My Boards: {myBoards?.length}</span>
        <Button onClick={() => modalsDispatch({ type: "add", component: <CreateBoardModal /> })}>Create Board</Button>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {myBoards?.map((board) => (
          <Board
            boardName={board.boardName}
            backgroundURL={board.backgroundURL}
            id={board.id}
            ownerUID={board.ownerUID}
            key={board.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardsList;
