import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbzagtIKs5wMWDpacemOJF57WgKKYurr4",
  authDomain: "comprov-cf2de.firebaseapp.com",
  projectId: "comprov-cf2de",
  storageBucket: "comprov-cf2de.appspot.com",
  messagingSenderId: "563520091991",
  appId: "1:563520091991:web:63702d7d071581f234f012",
  measurementId: "G-S764XDEKV4",
};

if (Firebase.apps.length === 0) {
  Firebase.initializeApp(firebaseConfig);
}

const Firestore = Firebase.firestore();
const Auth = Firebase.auth();
const Storage = Firebase.storage();

export { Firebase, Firestore, Auth, Storage };
