import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
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

function addCardListener(id) {
  document.getElementById(id).addEventListener("click", function () {
    window.location.href = "view.html?id=" + id;
  });
}

function addDeleteListener(id) {
  document
    .getElementById("deleteButton")
    .addEventListener("click", async function () {
      if (confirm("Are you sure you want to delete this card?")) {
        await deleteDoc(doc(db, "cards", id));
        window.location.reload();
      } else {
        return;
      }
    });
}

function getCards() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const q = query(collection(db, "cards"), where("owner", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var id = doc.id;
        if (doc.data().template == "golden") {
          $("#cards-go-here").append(`<div class="card-container">
          <div class="card-image">
            <img src="../assets/template1-preview.png" width="200px" />
          </div>
          <div class="card-info">
            <strong>Recipient:</strong> ${
              doc.data().recipient
            } <br /><strong>Created:</strong>
            ${doc.data().dateCreated}
          </div>
          <div class="button-wrapper">
            <button class="btn-view" id="${doc.id}">View</button
            ><button class="btn-delete" id="deleteButton">Delete</button>
          </div>
        </div>`);
        } else if (doc.data().template == "blue") {
          $("#cards-go-here").append(`<div class="card-container">
          <div class="card-image">
            <img src="../assets/template2-preview.png" width="200px" />
          </div>
          <div class="card-info">
            <strong>Recipient:</strong> ${
              doc.data().recipient
            } <br /><strong>Created:</strong>
            ${doc.data().dateCreated}
          </div>
          <div class="button-wrapper">
            <button class="btn-view" id="${doc.id}">View</button
            ><button class="btn-delete" id="deleteButton">Delete</button>
          </div>
        </div>`);
        } else if (doc.data().template == "red") {
          $("#cards-go-here").append(`<div class="card-container">
          <div class="card-image">
            <img src="../assets/template3-preview.png" width="200px" />
          </div>
          <div class="card-info">
            <strong>Recipient:</strong> ${
              doc.data().recipient
            } <br /><strong>Created:</strong>
            ${doc.data().dateCreated}
          </div>
          <div class="button-wrapper">
            <button class="btn-view" id="${doc.id}">View</button
            ><button class="btn-delete" id="deleteButton">Delete</button>
          </div>
        </div>`);
        }
        addCardListener(id);
        addDeleteListener(id);
      });
    } else {
      console.log("Error fetching cards");
    }
  });
}
getCards();
