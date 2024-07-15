import db from "./firebase.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

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
    } else {
      checker = 0;
    }
  });

  if (checker === 2) { // Ensure all 2 inputs are filled (email and password)
    loginBtn.style.opacity = "1";
    loginBtn.style.cursor = "pointer";
    loginBtn.addEventListener("mouseover", btnOver, true);
    loginBtn.addEventListener("mouseout", btnOut, true);
  } else {
    console.log("please enter a password");
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
    const password = document.querySelector('#password').value;

    // console.log("Email: ", email);
    // console.log("Password: ", password);

    try {
      // Add document to Firestore
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // Handle successful login
          alert("Login successful!");
          // Redirect to the home page
          window.location.href = "./home.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error logging in: ", error);
          alert("Login Failed. Please try again.");
        });

    } catch (e) {
      console.error("Error authenticating", e);
      // Handle error
      alert("Error logging in. Please try again.");
    }
  });
} else {
  console.error("Form element not found!");
}
