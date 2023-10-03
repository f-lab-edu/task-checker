"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import Layout from "_components/common/layout";
import { googleSignIn } from "_firebase/auth";

const SignPage = () => {
  const { push } = useRouter();

  const authList = useMemo(() => [{ name: "Google", icon: <FcGoogle />, handleClick: googleSignIn }], []);

  return (
    <Layout hasHeader={false} isRequiredSignedIn={false}>
      <div className="flex justify-center h-screen py-40 bg-stone-100">
        <div className="w-96 h-full shadow-lg flex flex-col items-center py-7 gap-10 bg-white">
          <h1 className="text-4xl">Task Checker</h1>
          <p>Sign In / Sign Up</p>
          <div className="w-full px-10">
            {authList.map((el) => (
              <button
                onClick={() => el.handleClick().then(() => push("/boards"))}
                className="flex items-center border shadow-md py-2 w-full px-2 justify-center gap-2 hover-translucent"
                key={el.name}
              >
                <span>{el.icon}</span>
                <span>{el.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignPage;
