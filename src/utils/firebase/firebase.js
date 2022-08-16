// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
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

export const createUserDocumentFromAuth = async (userAuth, additionalInfo)=>{
  const userDocRef = doc(db,'users',userAuth.uid)
  const snapShot = await getDoc(userDocRef)
  
  if(!snapShot.exists()){
    console.log('ok')
    const { displayName, email } = userAuth
    const createdAt = new Date()

    console.log({
      displayName,
      email,
      createdAt,
      ...(additionalInfo? additionalInfo : {})
    })

    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...(additionalInfo? additionalInfo : {})
      })
    } catch (error) {
      console.log(error.message)
    }

  }

  return userDocRef;
}

export const createAuthUserWithMailAndPassword = async (email, password)=>{
  if(!email || !password) return ;
  return await createUserWithEmailAndPassword(auth,email, password)
}


export const signInAuthUserWithMailAndPassword = async (email, password)=>{
  if(!email || !password) return ;
  return await signInWithEmailAndPassword(auth,email, password)
}

