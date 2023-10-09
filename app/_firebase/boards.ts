import { addDoc, collection, deleteDoc, doc, getDocs, Query, query, where } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useMutation, useQuery } from "@tanstack/react-query";

import { boardsKeys } from "_api/queryKeys";
import { firebaseCollection, firebaseDb, firebaseStorage } from "_firebase";
import { Board } from "_types/boards";

const boardsCollection = collection(firebaseDb, firebaseCollection.boards);

export const useGetMyBoardsQuery = (ownerUID?: string) =>
  useQuery({
    queryKey: boardsKeys.my(ownerUID),
    queryFn: () => getMyBoards(ownerUID),
    select: (res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  });
export const useCreateBoardMutation = () => useMutation({ mutationFn: createBoard });
export const useDeleteBoardMutation = () => useMutation({ mutationFn: deleteBoard });

const getMyBoards = async (ownerUID?: string) => {
  const myBoardsQuery = query(boardsCollection, where("ownerUID", "==", String(ownerUID)));
  const querySnapshot = await getDocs(myBoardsQuery as Query<Board, Board>);
  return querySnapshot;
};
const createBoard = async ({ boardName, ownerUID, backgroundURL }: Board) => {
  if (!boardName || !ownerUID) return alert("모든 정보를 입력해주세요.");
  const docRef = await addDoc(boardsCollection, { boardName, ownerUID: String(ownerUID), backgroundURL });
  return docRef;
};
const deleteBoard = async (boardId: string) => {
  const docRef = await deleteDoc(doc(firebaseDb, firebaseCollection.boards, boardId));
  return docRef;
};
export const uploadBackgroundImage = async (file: File) => {
  const storageRef = ref(firebaseStorage, `images/background/${file.name}`);
  return uploadBytes(storageRef, file).then((snapshot) => console.log(snapshot));
};
