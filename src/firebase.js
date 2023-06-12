// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiY43WarmHJQ0fQTEUSnXZmavaYeSJKLo",
  authDomain: "tracker-website-dbfd7.firebaseapp.com",
  databaseURL: "https://tracker-website-dbfd7-default-rtdb.firebaseio.com",
  projectId: "tracker-website-dbfd7",
  storageBucket: "tracker-website-dbfd7.appspot.com",
  messagingSenderId: "456315105780",
  appId: "1:456315105780:web:d29b7ed86a80e760a809a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app; 