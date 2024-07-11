//import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyASSx-eBLQ3VFxWvK_qh1763yHf79ijQUU",
  authDomain: "myntra-app-login.firebaseapp.com",
  projectId: "myntra-app-login",
  storageBucket: "myntra-app-login.appspot.com",
  messagingSenderId: "921272533581",
  appId: "1:921272533581:web:8a4ce75a6fe73dbadb9204",
  measurementId: "G-TE69QTXGNB"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const db = getFirestore(db);