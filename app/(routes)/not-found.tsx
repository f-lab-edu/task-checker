"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const { back } = useRouter();

  return (
    <>
      <h1>404 NotFound</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link href="/">메인 페이지로 돌아가기</Link>
      <br />
      <button onClick={back}>이전 페이지로 돌아가기</button>
    </>
  );
};

export default NotFoundPage;
