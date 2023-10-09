"use client";

import React, { Suspense } from "react";

import BoardsList from "_components/boards/list";
import Layout from "_components/common/layout";
import Loading from "_components/common/loading";

const BoardsPage = () => {
  return (
    <Layout hasHeader={true} isRequiredSignedIn={true}>
      <div className="flex justify-center items-center">
        <div className="shadow-3xl max-w-6xl w-full p-10 h-screenWithoutHeader bg-white flex flex-col gap-10">
          <h2 className="text-3xl">My Boards</h2>
          <Suspense fallback={<Loading />}>
            <BoardsList />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
};

export default BoardsPage;
