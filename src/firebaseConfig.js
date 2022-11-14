import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf1fR-Z-CsdIg9Ue7JuoAEPMw3VrqKpWU",
  authDomain: "blog-2d74d.firebaseapp.com",
  projectId: "blog-2d74d",
  storageBucket: "blog-2d74d.appspot.com",
  messagingSenderId: "900953738184",
  appId: "1:900953738184:web:0d7dfa5a74b64287f10efd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
