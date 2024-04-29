// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "waibaestate-edd5f.firebaseapp.com",
  projectId: "waibaestate-edd5f",
  storageBucket: "waibaestate-edd5f.appspot.com",
  messagingSenderId: "127842437263",
  appId: "1:127842437263:web:b155498fcc34c221f1c8fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);