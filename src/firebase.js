import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaQeiFbHGRgNDblVZQAEitCuuMgefe6ak",
  authDomain: "safeher-dfb13.firebaseapp.com",
  projectId: "safeher-dfb13",
  storageBucket: "safeher-dfb13.firebasestorage.app",
  messagingSenderId: "496234826320",
  appId: "1:496234826320:web:4f85a54ddbb5542b6e1f55",
  measurementId: "G-GD3EDX6R5P"
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export const facebookProvider =
  new FacebookAuthProvider();