import { useMutation, useQuery } from "@tanstack/react-query";
import { addDoc, collection, deleteDoc, doc, getDocs, Query, query, setDoc } from "firebase/firestore";

import { usersKeys } from "_api/queryKeys";
import { firebaseCollection, firebaseDb } from "_firebase";
import { User } from "_types/user";

const usersCollection = collection(firebaseDb, firebaseCollection.users);
const usersQuery = query(usersCollection);

export const useGetUsersQuery = () =>
  useQuery({
    queryKey: usersKeys.users(),
    queryFn: getUsers,
    select: (res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  });
export const useCreateUserMutation = () => useMutation({ mutationFn: createUser });
export const useDeleteUserMutation = () => useMutation({ mutationFn: deleteUser });
export const useUpdateUserMutation = () => useMutation({ mutationFn: updateUser });

const getUsers = async () => {
  const querySnapshot = await getDocs(usersQuery as Query<User, User>);
  return querySnapshot;
};
const createUser = async ({ userName, userAge }: User) => {
  if (!userName || !userAge) return alert("모든 정보를 입력해주세요.");
  const docRef = await addDoc(usersCollection, { userName, userAge });
  return docRef;
};
const deleteUser = async (id: string) => {
  const docRef = await deleteDoc(doc(firebaseDb, firebaseCollection.users, id));
  return docRef;
};
const updateUser = async ({ userName, userAge, id }: Required<User>) => {
  if (!userName || !userAge) return alert("모든 정보를 입력해주세요.");
  const docRef = await setDoc(doc(firebaseDb, firebaseCollection.users, id), { userName, userAge });
  return docRef;
};
