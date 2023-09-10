"use client";

import React from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";

import { testAtom } from "_stores/test";

const TestPage = () => {
  const testNumber = useAtomValue(testAtom);

  return (
    <>
      <div>테스트 숫자: {testNumber}</div>
      <Link href="/">기본 페이지 이동</Link>
    </>
  );
};

export default TestPage;
