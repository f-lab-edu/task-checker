import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDF0_YwyEfzqWS7KsQSlv0Mrldga9W84NY",
  authDomain: "task-checker-142c8.firebaseapp.com",
  projectId: "task-checker-142c8",
  storageBucket: "task-checker-142c8.appspot.com",
  messagingSenderId: "160441579497",
  appId: "1:160441579497:web:b753a838fa89838a8e3d78",
};

const firebaseCollection = {
  users: "users",
  boards: "boards",
};

const app = initializeApp(firebaseConfig);

const firebaseDb = getFirestore(app);
const firebaseAuth = getAuth(app);
const firebaseStorage = getStorage(app);

export { firebaseDb, firebaseAuth, firebaseStorage, firebaseCollection };
