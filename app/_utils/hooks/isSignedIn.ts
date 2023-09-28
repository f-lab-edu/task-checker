import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "_firebase";

const useSignStatus = () => {
  const [isLoading, setLoading] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setSignedIn(Boolean(user));
      setLoading(false);
    });
  }, []);

  return [isSignedIn, isLoading];
};

export default useSignStatus;
