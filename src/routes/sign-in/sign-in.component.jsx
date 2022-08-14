import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase'
const signIn = () => {
  const logGoogleUser = async ()=>{
    const {user} = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
    console.log(user)
  }
  return (
    <div><button onClick={logGoogleUser}>Sign in with google</button></div>
  )
}

export default signIn