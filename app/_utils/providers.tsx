import React, { ReactNode } from "react";
import { Provider } from "jotai";

const Providers = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default Providers;
