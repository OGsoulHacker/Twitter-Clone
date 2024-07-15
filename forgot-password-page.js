import db from "./firebase.js";
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

// Select all input fields and the login button
const loginInp = document.querySelectorAll(".inp-area input");
const loginBtn = document.querySelector(".btn-area button");

// Define the button hover effects
const btnOver = () => {
  loginBtn.style.backgroundColor = "rgb(12, 144, 225)";
  loginBtn.style.border = "1px solid rgb(12, 144, 225)";
};
const btnOut = () => {
  loginBtn.style.backgroundColor = "rgb(29, 161, 242)";
  loginBtn.style.border = "1px solid rgb(29, 161, 242)";
};

// Check the input fields and update button state
document.addEventListener("keyup", () => {
  let checker = 0;
  loginInp.forEach((inp) => {
    if (inp.value !== "") {
      checker++;
    }
  });

  if (checker > 0) { // Ensure email field is filled out
    loginBtn.style.opacity = "1";
    loginBtn.style.cursor = "pointer";
    loginBtn.addEventListener("mouseover", btnOver, true);
    loginBtn.addEventListener("mouseout", btnOut, true);
  } else {
    console.log("Please enter an email");
    loginBtn.style.opacity = "0.5";
    loginBtn.style.cursor = "initial";
    loginBtn.removeEventListener("mouseover", btnOver, true);
    loginBtn.removeEventListener("mouseout", btnOut, true);
  }
});

// Select the form element
const form = document.querySelector('.form');

if (form) {
  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("Form submitted!");

    // Get input values
    const email = document.querySelector('#email').value;

    try {
      // Add document to Firestore
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert("Password reset email sent! Navigating back to login page.");
        window.location.href = "./login-page.html"; // Redirect to login page 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error attempting to send password reset email: ", error);
        alert("An error occurred while attempting to send password reset email. Please try again.");
        // ..
      });

    } catch (e) {
      console.error("Error during password reset email process", e);
    }
  });
} else {
  console.error("Form element not found!");
}
