// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARHsi48CweKjtg8g9rhTUiPdC-DMH-B9w",
    authDomain: "desivibes-534e7.firebaseapp.com",
    projectId: "desivibes-534e7",
    storageBucket: "desivibes-534e7.appspot.com",
    messagingSenderId: "492424089090",
    appId: "1:492424089090:web:6eb610b6660c0e3b57e11b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);