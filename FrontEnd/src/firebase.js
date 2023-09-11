import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOVTi1N_7BZn2iFhlMmnXLLszpTQCCCMA",
  authDomain: "clone-353d2.firebaseapp.com",
  projectId: "clone-353d2",
  storageBucket: "clone-353d2.appspot.com",
  messagingSenderId: "356713302445",
  appId: "1:356713302445:web:8dccc4c38b4754ac673924",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;