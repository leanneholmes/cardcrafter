import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

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
// signup
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = signupForm["name"].value;
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;
  signupForm.reset();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: email,
      })
        .then(function () {
          window.location.assign("home.html");
        })
        .catch(function (error) {
          console.log("Error adding new user: " + error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
