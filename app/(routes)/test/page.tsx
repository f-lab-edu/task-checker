"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";

import { useCreateUserMutation, useDeleteUserMutation, useGetUserQuery, useUpdateUserMutation } from "_api/user";
import { testAtom } from "_stores/test";

const TestPage = () => {
  const testNumber = useAtomValue(testAtom);

  const { data, isLoading } = useGetUserQuery();
  const { mutate: createUser } = useCreateUserMutation();
  const { mutate: updateUser } = useUpdateUserMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();

  const [userName, setUserName] = useState("");

  return (
    <>
      <div>테스트 숫자: {testNumber}</div>
      <div>서버 메시지: {isLoading ? "loading..." : data.message}</div>
      <input
        className="bg-black border text-white"
        placeholder="post 요청 시 사용할 이름"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <button className="border px-5" onClick={() => createUser({ userName })}>
        POST 요청
      </button>
      <button className="border px-5" onClick={() => updateUser()}>
        PATCH 요청
      </button>
      <button className="border px-5" onClick={() => deleteUser()}>
        DELETE 요청
      </button>
      <br />
      <Link href="/">기본 페이지 이동</Link>
    </>
  );
};

export default TestPage;
