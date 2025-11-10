// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfqMToQD8CzckDlKfP2b2K-kSL4ZBBWZ4",
  authDomain: "privy-cbt.firebaseapp.com",
  projectId: "privy-cbt",
  storageBucket: "privy-cbt.firebasestorage.app",
  messagingSenderId: "124654259531",
  appId: "1:124654259531:web:84e5dc58cdc92ddb07acce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export function authData() {
  return auth, createUserWithEmailAndPassword;
}
