import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
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

async function getDetails() {
  const parsedUrl = new URL(window.location.href);
  // assign id to a variable
  var id = parsedUrl.searchParams.get("id");
  // use this ID to read from firestore
  const docRef = doc(db, "cards", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    if (docSnap.data().template == "red") {
      $("#details-go-here").append(
        `<div class="centered template3-container"><div class="background-template3"></div>
      <div class="recipient-template3">To: ${docSnap.data().recipient}</div>
      <div class="greeting-template3">${docSnap.data().greeting}</div>
      <div class="message-template3">
      ${docSnap.data().message}
      </div>
      <img src="../assets/template3-divider.png" class="template2-divider" />
      <div class="sender-template3">From: ${docSnap.data().sender}</div></div>`
      );
    } else if (docSnap.data().template == "golden") {
      $("#details-go-here").append(
        `<div class="centered template1-container"><div class="background-template1"></div>
      <div class="recipient-template1">To: ${docSnap.data().recipient}</div>
      <div class="greeting-template1">${docSnap.data().greeting}</div>
      <div class="message-template1">
      ${docSnap.data().message}
      </div>
      <img src="../assets/template1-divider.png" class="template1-divider" />
      <div class="sender-template1">From: ${docSnap.data().sender}</div></div>`
      );
    } else if (docSnap.data().template == "blue") {
      $("#details-go-here").append(
        `<div class="centered template2-container">
          <div class="background-template2"></div>
          <div class="recipient-template2">To: ${docSnap.data().recipient}</div>
          <div class="greeting-template2">${docSnap.data().greeting}</div>
          <div class="message-template2">
          ${docSnap.data().message}
          </div>
          <img src="../assets/template2-divider.png" class="template2-divider" />
          <div class="sender-template2">From: ${
            docSnap.data().sender
          }</div></div>`
      );
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("Card not found");
  }
}
getDetails();

// document.body.style.backgroundColor = "red";
