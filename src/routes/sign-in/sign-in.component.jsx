import React from 'react'
import SignUpForm from '../sign-up/sign-up-form.component'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase'
const signIn = () => {
  const logGoogleUser = async ()=>{
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  return (
    <div>
      <button onClick={logGoogleUser}>Sign in with google</button>
      <SignUpForm />
    </div>
  )
}

export default signIn