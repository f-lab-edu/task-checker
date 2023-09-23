import React from "react";

interface GlobalErrorPageProps {
  reset: () => void;
}

const GlobalErrorPage = (props: GlobalErrorPageProps) => {
  return (
    <>
      <h1>Error</h1>
      <p>문제가 발생하였습니다.</p>
      <button onClick={props.reset}>다시 시도하기</button>
    </>
  );
};

export default GlobalErrorPage;
