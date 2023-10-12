import React from "react";
import { useSetAtom } from "jotai";
import { Button } from "@mui/material";

import Board from "_components/boards";
import CreateBoardModal from "_components/boards/createModal";
import { useMyBoardsQuery } from "_firebase/boards";
import { modalReducerAtom, openModal } from "_stores/modal";
import useUserAccount from "_utils/hooks/auth";

const BoardsList = () => {
  const userAccount = useUserAccount();
  const modalsDispatch = useSetAtom(modalReducerAtom);

  const myBoards = useMyBoardsQuery(userAccount?.uid);

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>Number of My Boards: {myBoards.data?.length}</span>
        <Button onClick={() => modalsDispatch(openModal(<CreateBoardModal />))}>Create Board</Button>
      </div>
      <div className="grid grid-cols-3 gap-10">
        {myBoards.data?.map((board) => (
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
