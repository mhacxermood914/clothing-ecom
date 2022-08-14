// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider
} from "firebase/auth"
import {
  doc,
  getFirestore,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyCjKKDtTzMD1l2Hi6AT56JK3elkQe9dLAQ",

  authDomain: "clothing-app-2c292.firebaseapp.com",

  projectId: "clothing-app-2c292",

  storageBucket: "clothing-app-2c292.appspot.com",

  messagingSenderId: "1079444799189",

  appId: "1:1079444799189:web:2d8aa861c9f9991e5dac5c",

  measurementId: "G-9P8G8S52YG"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()

export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider)

const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth)=>{
  const userDocRef = doc(db,'users',userAuth.uuid)
  const snapShot = await getDoc(userDocRef)
  console.log({snapShot})
}


