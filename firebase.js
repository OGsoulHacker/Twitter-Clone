//import { initializeApp } from 'firebase/app'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js'
// const firebaseConfig = {
//     apiKey: "AIzaSyB8RPf_A8_PM0TrzxLovC2e0qH-6euxdBE",
//     authDomain: "twitter-clone-ea22b.firebaseapp.com",
//     databaseURL: "https://twitter-clone-ea22b-default-rtdb.firebaseio.com",
//     projectId: "twitter-clone-ea22b",
//     storageBucket: "twitter-clone-ea22b.appspot.com",
//     messagingSenderId: "974165957178",
//     appId: "1:974165957178:web:f8f2d722550fd4895e3303"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyAOsAwSG6_4tTmCQzIAVLmMLguMaCR8oWI",
  authDomain: "twitterclone-ea9dc.firebaseapp.com",
  projectId: "twitterclone-ea9dc",
  storageBucket: "twitterclone-ea9dc.appspot.com",
  messagingSenderId: "435935486537",
  appId: "1:435935486537:web:51d0593a491bc4b04b1598",
  measurementId: "G-VEVS2SVYDG"
};
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
  const firebase = initializeApp(firebaseConfig);

  const db = getFirestore(firebase);
  //
  export default db;