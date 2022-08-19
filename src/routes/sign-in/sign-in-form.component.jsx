import React, { useState, useRef } from 'react'
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { signInAuthUserWithMailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup } from './../../utils/firebase/firebase'
import { useContext } from 'react'
import { UserContext } from '../../contexts/user.context'
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password:'',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {setCurrentUser} = useContext(UserContext)
  const form = useRef(null)
  const { email, password } = formFields

   console.log('ok')
  
  const handleChange = (event)=>{
    const { name, value } = event.target
    setFormFields({...formFields, [name]:value})
  }

  
  const resetFormFields = ()=>{
    setFormFields(defaultFormFields)
  }

  
  const signInWithGoogle = async ()=>{
    const { user }= await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event)=>{

    event.preventDefault()
    try{

        const { user } = await signInAuthUserWithMailAndPassword(email, password)

        
        console.log({user})
        
        form.current.reset()
        setCurrentUser(user)
    }
    catch(err){
      switch(err.code){
        case 'auth/wrong-password':
          alert('Incorrect password for email')
          break
        case 'auth/wrong-password':
          alert('No user associate with that email')
        default:
          console.log(err)
      }
    }

  }


  return (
    <div className='sign-in-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit} ref={form}>
            <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}  />
            <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
            <div className='buttons-container'>
              <Button type="submit" buttonType='inverted'>Sign In</Button>
              <Button  type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In </Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm