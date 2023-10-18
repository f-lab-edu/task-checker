"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";

import { testAtom } from "_stores/test";
import { User } from "_types/user";
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "_firebase/users";

const TestPage = () => {
  const testNumber = useAtomValue(testAtom);

  const [isEditting, setEditting] = useState(false);
  const [docId, setDocId] = useState("");
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);

  const { data: users, refetch } = useGetUsersQuery();
  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: deleteUser } = useDeleteUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const handleUserSelect = (user: Required<User>) => {
    setEditting(true);
    setDocId(user.id);
    setUserName(user.userName);
    setUserAge(user.userAge);
  };
  const handleCancelUpdate = () => {
    setEditting(false);
    setUserName("");
    setUserAge(0);
  };
  const handleUserCreate = () => {
    createUser({ userName, userAge }).then(() => {
      refetch();
      setUserName("");
      setUserAge(0);
    });
  };
  const handleUserDelete = (user: Required<User>) => {
    deleteUser(user.id).then(() => refetch());
    setUserName("");
    setUserAge(0);
    setEditting(false);
  };
  const handleUserUpdate = () => {
    updateUser({ userName, userAge, id: docId }).then(() => {
      refetch();
      setUserName("");
      setUserAge(0);
      setEditting(false);
    });
  };

  return (
    <div className="px-2">
      <div>테스트 숫자: {testNumber}</div>
      <div className="border">
        <h3 className="border-b py-2 px-2">유저 목록</h3>
        <div className="px-2 py-2">
          {users &&
            users.map((user) => (
              <p key={user.id} className="flex justify-between">
                <span>
                  {user.userName} ({user.userAge}세)
                </span>
                <span className="flex gap-4">
                  <button onClick={() => handleUserSelect(user)}>선택</button>
                  <button onClick={() => handleUserDelete(user)}>삭제</button>
                </span>
              </p>
            ))}
        </div>
      </div>
      <div className="flex gap-2 my-4">
        <input
          className="bg-black border text-white px-2"
          placeholder="이름"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="bg-black border text-white px-2"
          placeholder="나이"
          type="number"
          value={userAge || ""}
          onChange={(e) => setUserAge(Number(e.target.value))}
        />
        {isEditting ? (
          <>
            <button className="border px-5" onClick={handleUserUpdate}>
              수정하기
            </button>
            <button className="border px-2" onClick={handleCancelUpdate}>
              취소
            </button>
          </>
        ) : (
          <button className="border px-5" onClick={handleUserCreate}>
            등록하기
          </button>
        )}
      </div>
      <Link href="/">기본 페이지 이동</Link>
    </div>
  );
};

export default TestPage;
