// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApUouqMf7G7KFYUsCWKJHSuEkjddwD8c4",
  authDomain: "chat-app-ced61.firebaseapp.com",
  projectId: "chat-app-ced61",
  storageBucket: "chat-app-ced61.appspot.com",
  messagingSenderId: "313699688469",
  appId: "1:313699688469:web:e2ed5f909bc745413e2e1c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
