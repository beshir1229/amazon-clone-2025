
import firebase from "firebase/compat/app";
//  4 authentication
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmlnGT96w-dYV2papLnzqVR1puN_JthPU",
  authDomain: "clone-2025-d991f.firebaseapp.com",
  projectId: "clone-2025-d991f",
  storageBucket: "clone-2025-d991f.firebasestorage.app",
  messagingSenderId: "288048602340",
  appId: "1:288048602340:web:8b5a930b55d50cb79b60f1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
