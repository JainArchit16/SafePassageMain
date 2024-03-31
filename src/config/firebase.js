// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD1mYAcv6rf4KxzRBT9N5KMY0l7lFLIImI",
  authDomain: "safepassage-92dde.firebaseapp.com",
  projectId: "safepassage-92dde",
  storageBucket: "safepassage-92dde.appspot.com",
  messagingSenderId: "479706030370",
  appId: "1:479706030370:web:a4d7252c6632280b13057b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
export const db = getFirestore(app);
