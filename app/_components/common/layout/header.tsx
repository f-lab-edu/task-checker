"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@mui/material/Button";

import Dropdown from "_components/common/dropdown";
import useSignStatus from "_utils/hooks/isSignedIn";
import { googleSignOut } from "_firebase/auth";
import useUserAccount from "_utils/hooks/auth";

const Header = () => {
  const { push } = useRouter();

  const [isSignedIn, isLoading] = useSignStatus();
  const userAccount = useUserAccount();

  const handleSignOut = () => {
    googleSignOut().then(() => push("/"));
  };

  return (
    <header className="flex justify-between h-16 items-center px-4 shadow-md sticky top-0">
      <h1>Task Checker</h1>
      <div className="flex">
        {!isLoading &&
          (isSignedIn ? (
            <>
              <Button onClick={() => push("/boards")}>Board Page</Button>
              <Dropdown
                buttonComponent={
                  <div className="p-1 rounded-full">
                    <div className="relative w-[30px] h-[30px]">
                      <Image
                        className="object-cover rounded-full"
                        src={userAccount!.photoURL!}
                        alt={userAccount!.displayName!}
                        fill={true}
                        sizes="100vw"
                      />
                    </div>
                  </div>
                }
                menuComponent={
                  <div>
                    <h3>Account</h3>
                    <div className="flex justify-between items-center gap-5">
                      <div className="relative w-[45px] h-[45px]">
                        <Image
                          className="object-cover rounded-full"
                          src={userAccount!.photoURL!}
                          alt={userAccount!.displayName!}
                          fill={true}
                          sizes="100vw"
                        />
                      </div>
                      <div>
                        <p>{userAccount?.displayName}</p>
                        <p>{userAccount?.email}</p>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <button onClick={() => push("/account")} className="hover-translucent w-full py-1">
                      Manage Account
                    </button>
                    <hr className="my-2" />
                    <button onClick={handleSignOut} className="hover-translucent w-full py-1">
                      Log Out
                    </button>
                  </div>
                }
              />
            </>
          ) : (
            <button className="hover-translucent px-2" onClick={() => push("/sign")}>
              Sign In / Sign Up
            </button>
          ))}
      </div>
    </header>
  );
};

export default Header;
