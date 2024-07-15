import db from "./firebase.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js'

// Select all input fields and the signup button
const signupInp = document.querySelectorAll(".inp-area input");
const signupBtn = document.querySelector(".btn-area button");

// Define the button hover effects
let btnOver = () => {
  signupBtn.style.backgroundColor = "rgb(12, 144, 225)";
  signupBtn.style.border = "1px solid rgb(12, 144, 225)";
};
let btnOut = () => {
  signupBtn.style.backgroundColor = "rgb(29, 161, 242)";
  signupBtn.style.border = "1px solid rgb(29, 161, 242)";
};

// Check the input fields and update button state
document.addEventListener("keyup", () => {
  let checker = 0;
  signupInp.forEach((inp) => {
    if (inp.value !== "") {
      checker++;
    } else {
      checker = 0;
    }
  });

  if (checker === 4) { // Ensure all 4 inputs are filled (first name, last name, email, and password)
    signupBtn.style.opacity = "1";
    signupBtn.style.cursor = "pointer";
    signupBtn.addEventListener("mouseover", btnOver, true);
    signupBtn.addEventListener("mouseout", btnOut, true);
  } else {
    signupBtn.style.opacity = "0.5";
    signupBtn.style.cursor = "initial";
    signupBtn.removeEventListener("mouseover", btnOver, true);
    signupBtn.removeEventListener("mouseout", btnOut, true);
  }
});

// Select the form element
const form = document.querySelector('.form');

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get input values
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const username = "@" + firstName + lastName;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  try {
    
    // Add document to Firestore
    const docRef = addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password
      });
    // console.log("User created with ID: ", usersSnapshot.data().count + 1);
    console.log("User created with docRefID: ", docRef.id); 

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        console.log("User added to firebase auth");
        alert("Signup successful! Redirecting to login page...");
        window.location.href = "./login-page.html"; // Redirect to login page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle error
        console.error("Error creating user: ", errorMessage);
        alert("Error signing up. Please try again.");
        // ..
      }); 
  } catch (e) {
    console.error("Error during signup process: ", e);
  }
});