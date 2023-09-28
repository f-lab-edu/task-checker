"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Dropdown from "_components/common/dropdown";
import useSignStatus from "_utils/hooks/isSignedIn";
import { googleSignOut } from "_firebase/auth";
import useUserAccount from "_utils/hooks/auth";
import useOutsideClick from "_utils/hooks/dropdown";

const Header = () => {
  const { push } = useRouter();

  const userMenuRef = useRef(null);

  const [isSignedIn, isLoading] = useSignStatus();
  const userAccount = useUserAccount();
  const [isUserMenuActivated, setUserMenuActivated] = useOutsideClick(userMenuRef, false);

  const handleSignOut = () => {
    googleSignOut().then(() => push("/"));
  };

  return (
    <header className="flex justify-between h-16 items-center px-4 shadow-md sticky top-0">
      <h1>Task Checker</h1>
      <div>
        {!isLoading &&
          (isSignedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuActivated((prev) => !prev)}
                ref={userMenuRef}
                className="hover-translucent p-1 rounded-full"
              >
                <div className="relative w-[30px] h-[30px]">
                  <Image
                    className="object-cover rounded-full"
                    src={String(userAccount?.photoURL)}
                    alt={String(userAccount?.displayName)}
                    fill={true}
                    sizes="100vw"
                  />
                </div>
              </button>
              <Dropdown isActivated={isUserMenuActivated}>
                <div>
                  <h3>Account</h3>
                  <div className="flex justify-between items-center gap-5">
                    <div className="relative w-[45px] h-[45px]">
                      <Image
                        className="object-cover rounded-full"
                        src={String(userAccount?.photoURL)}
                        alt={String(userAccount?.displayName)}
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
              </Dropdown>
            </div>
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
