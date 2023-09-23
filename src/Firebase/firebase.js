// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrJso_uj2nVVJOIKz3zyfCO5nE9VmVqQw",
  authDomain: "book-mgmt-458ad.firebaseapp.com",
  projectId: "book-mgmt-458ad",
  storageBucket: "book-mgmt-458ad.appspot.com",
  messagingSenderId: "246174877330",
  appId: "1:246174877330:web:118fd54a1070f87160c84b",
  measurementId: "G-G6BJNEV7F7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
// npm install -g firebase-tools
//for deploy:
// firebase login
// firebase init
// firebase deploy