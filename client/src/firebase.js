// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "home-vista-68f1e.firebaseapp.com",
  projectId: "home-vista-68f1e",
  storageBucket: "home-vista-68f1e.firebasestorage.app",
  messagingSenderId: "202962822473",
  appId: "1:202962822473:web:f2a99c3cffad31b32c2698"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);