import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";

import { firebaseAuth, firebaseStorage } from "_firebase";

interface updateUserAccountPropsType {
  displayName: string;
  photoURL: string;
}

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(firebaseAuth, provider)
    .then(() => console.log("Sign In Success"))
    .catch((error) => Promise.reject(error));
};

const googleSignOut = () =>
  signOut(firebaseAuth)
    .then(() => console.log("Sign Out"))
    .catch((error) => Promise.reject(error));

const getUserAccount = () => onAuthStateChanged(firebaseAuth, (user) => user && user);

const updateUserAccount = ({ displayName, photoURL }: updateUserAccountPropsType) => {
  if (!firebaseAuth.currentUser) return;
  updateProfile(firebaseAuth.currentUser, { displayName, photoURL });
};

const uploadProfileImage = ({ file }: { file: File }) => {
  const storageRef = ref(firebaseStorage, `images/profile/${file.name}`);
  uploadBytes(storageRef, file).then((snapshot) => console.log(snapshot));
};

export { googleSignIn, googleSignOut, getUserAccount, updateUserAccount, uploadProfileImage };
