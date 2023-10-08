"use client";

import React, { ReactNode } from "react";
import { Provider } from "jotai";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ModalProvider from "_components/common/modal/provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 3 },
    mutations: { onError: () => console.log("에러 발생!"), onSuccess: () => console.log("요청 성공!") },
  },
  queryCache: new QueryCache({ onError: () => console.log("에러 발생!"), onSuccess: () => console.log("요청 성공!") }),
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ModalProvider />

        {children}
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
