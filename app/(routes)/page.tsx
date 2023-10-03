"use client";

import React from "react";

import Layout from "_components/common/layout";

const Home = () => {
  return (
    <Layout hasHeader={true} isRequiredSignedIn={false}>
      <div>main page</div>
    </Layout>
  );
};

export default Home;
