import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
};

const app = initializeApp(firebaseConfig);

const firebaseDb = getFirestore(app);

export { firebaseDb, firebaseCollection };
