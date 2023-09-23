import React, { ReactNode, Suspense } from "react";

import "globals.css";
import Loading from "_components/common/loading";
import Providers from "_utils/providers";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
