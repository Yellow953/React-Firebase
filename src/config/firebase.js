import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxyRSMLDxi-JsCF51mZKn9Rol1cQJpPGk",
  authDomain: "react-firebase-169eb.firebaseapp.com",
  projectId: "react-firebase-169eb",
  storageBucket: "react-firebase-169eb.firebasestorage.app",
  messagingSenderId: "374180924989",
  appId: "1:374180924989:web:390405ad7de168e777e454",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
