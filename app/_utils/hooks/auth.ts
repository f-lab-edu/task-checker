import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { firebaseAuth } from "_firebase";

const useUserAccount = () => {
  const [userAccount, setUserAccount] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => user && setUserAccount(user));
  }, []);

  return userAccount;
};

export default useUserAccount;
