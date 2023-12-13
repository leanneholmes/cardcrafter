import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  doc,
  setDoc,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const createForm = document.getElementById("create-form");

var date = moment().format("MMMM D, YYYY");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const template = document.querySelector(
    'input[name="template"]:checked'
  ).value;
  const recipient = createForm["recipient"].value;
  const sender = createForm["sender"].value;
  const greeting = createForm["greeting"].value;
  const message = createForm["message"].value;
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const docRef = await addDoc(collection(db, "cards"), {
        template: template,
        recipient: recipient,
        sender: sender,
        greeting: greeting,
        message: message,
        dateCreated: date,
        owner: uid,
      });
      window.location.assign("cards.html");
    } else {
      console.log("Error occurred in card creation");
    }
  });
});
