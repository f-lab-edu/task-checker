"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "_components/common/layout/header";
import useSignStatus from "_utils/hooks/isSignedIn";

interface LayoutPropsType {
  children: ReactNode;
  hasHeader: boolean;
  isRequiredSignedIn: boolean;
}

const Layout = ({ children, hasHeader, isRequiredSignedIn }: LayoutPropsType) => {
  const { push } = useRouter();

  const [isSignedIn, isLoading] = useSignStatus();

  useEffect(() => {
    if (!isRequiredSignedIn) return;
    if (!isLoading && !isSignedIn) {
      alert("Please Login");
      push("/");
    }
  }, [isLoading, isSignedIn]);

  if (isRequiredSignedIn && !isSignedIn) return null;

  return (
    <>
      {hasHeader && <Header />}
      <main className="bg-stone-200">{children}</main>
    </>
  );
};

export default Layout;
