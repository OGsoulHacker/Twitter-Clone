import db from "./firebase.js";
import { getAuth, updateEmail, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
import { collection, query, where, getDocs, updateDoc} from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js'

// Select all input fields and the signup button
const signupInp = document.querySelectorAll(".inp-area input");
const saveBtn = document.querySelector(".btn-area button");

// Define the button hover effects
let btnOver = () => {
  saveBtn.style.backgroundColor = "rgb(12, 144, 225)";
  saveBtn.style.border = "1px solid rgb(12, 144, 225)";
};
let btnOut = () => {
  saveBtn.style.backgroundColor = "rgb(29, 161, 242)";
  saveBtn.style.border = "1px solid rgb(29, 161, 242)";
};

// Check the input fields and update button state
document.addEventListener("keyup", () => {
  let checker = 0;
  signupInp.forEach((inp) => {
    if (inp.value !== "") {
      checker++;
    }
  });

  if (checker > 1) { // Ensure at least 1 input is filled
    saveBtn.style.opacity = "1";
    saveBtn.style.cursor = "pointer";
    saveBtn.addEventListener("mouseover", btnOver, true);
    saveBtn.addEventListener("mouseout", btnOut, true);
  } else {
    saveBtn.style.opacity = "0.5";
    saveBtn.style.cursor = "initial";
    saveBtn.removeEventListener("mouseover", btnOver, true);
    saveBtn.removeEventListener("mouseout", btnOut, true);
  }
});

// Select the form element
const form = document.querySelector('.form');

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Got user: ", user.email);
    const userEmail = user.email;
}
else {
  console.error("User is null");
  alert("User is null");
}
});


// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input values
  const newFirstName = document.querySelector('#firstName').value;
  const newLastName = document.querySelector('#lastName').value;
  const newEmail = document.querySelector('#email').value;

  try {
    
    // const auth = getAuth();
    const user = auth.currentUser;

    const userEmail = user.email;
    console.log("Got user2: ", userEmail);

    //Find user according to logged in user's username + password
    const usersQuery = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(usersQuery);
    querySnapshot.forEach((doc) => {
      //Update user's information
      console.log("doc is", doc.data());

      //Update user in firebase auth
      updateEmail(user, newEmail).then(() => {
        // Profile updated!
        updateDoc(doc.ref, {
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail
        });
        console.log("User updated");
        alert("Update successful!");
      }).catch((error) => {
        // An error occurred
        console.error("Error updating user: ", error);
        alert("Error updating user. Please try again.");
      });
    });
  } catch (e) {
    console.error("Error during signup process: ", e);
  }
});