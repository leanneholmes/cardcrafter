import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrNFb-Zy6mkIMiSRy7ePXFOTmm4Ew4kZg",
  authDomain: "cardcrafter-d6673.firebaseapp.com",
  projectId: "cardcrafter-d6673",
  storageBucket: "cardcrafter-d6673.appspot.com",
  messagingSenderId: "87124974862",
  appId: "1:87124974862:web:294320f4e3a505888f0b5f",
  measurementId: "G-3B638ZNZWC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); //add this to read and write

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const greetingSpan = document.getElementById("greeting-span");
const nameSpan = document.getElementById("name-span");

async function sayHello() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const email = user.email;
      greetingSpan.textContent = email;
      const usersRef = collection(db, "users");

      const q = query(usersRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().uid == uid) {
          nameSpan.textContent = doc.data().name;
        } else {
          console.log();
        }
      });
    } else {
      console.log("Error retrieving user credentials");
    }
  });
}
sayHello();
