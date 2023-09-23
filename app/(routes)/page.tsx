"use client";

import React from "react";
import Link from "next/link";
import { useAtom } from "jotai";

import { testAtom } from "_stores/test";

const Home = () => {
  const [testNumber, setTestNumber] = useAtom(testAtom);

  return (
    <>
      <div>전역 상태 테스트 숫자: {testNumber}</div>
      <button className="border px-5" onClick={() => setTestNumber(testNumber + 1)}>
        +
      </button>
      <button className="border px-5" onClick={() => setTestNumber(testNumber - 1)}>
        -
      </button>
      <br />
      <Link href="/test">test 페이지 이동</Link>
    </>
  );
};

export default Home;
