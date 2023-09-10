"use client";

import React from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { getTestMessage } from "_api/route";
import { testAtom } from "_stores/test";

const TestPage = () => {
  const testNumber = useAtomValue(testAtom);

  const { data, isLoading } = useQuery({ queryKey: ["testMessage"], queryFn: getTestMessage });

  return (
    <>
      <div>테스트 숫자: {testNumber}</div>
      <div>서버 메시지: {isLoading ? "loading..." : data.message}</div>
      <Link href="/">기본 페이지 이동</Link>
    </>
  );
};

export default TestPage;
