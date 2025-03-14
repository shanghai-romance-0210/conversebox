import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLtviP5-jkDvN6NCqKBClUFT0LRphiP_M",
  authDomain: "converse-box-app.firebaseapp.com",
  projectId: "converse-box-app",
  storageBucket: "converse-box-app.firebasestorage.app",
  messagingSenderId: "1032687636744",
  appId: "1:1032687636744:web:9a15bf86f4597b41d39cbd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };