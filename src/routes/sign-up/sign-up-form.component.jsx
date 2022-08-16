import React, { useState, useRef } from 'react'
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import { createAuthUserWithMailAndPassword, createUserDocumentFromAuth } from './../../utils/firebase/firebase'
import './sign-up-form.styles.scss'
const defaultFormFields = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword: ''
}
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const form = useRef(null)
  const { displayName, email, password, confirmPassword } = formFields

  
  const handleChange = (event)=>{
    const { name, value } = event.target
    setFormFields({...formFields, [name]:value})
  }

  
  const resetFormFields = ()=>{
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event)=>{

      event.preventDefault()

    if(password !== confirmPassword){ alert('password do not match'); return; }


    try{
        const { user } = await createAuthUserWithMailAndPassword(email, password)

        await createUserDocumentFromAuth(user,{ displayName})
        form.current.reset()
    }
    catch(err){
        if(err.code === "auth/email-already-in-use"){
            alert('cannot create user, email already in use')
        }else{
            console.log('error encounter',err)
        }
    }

  }


  return (
    <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit} ref={form}>
            <FormInput label="Display Name" type="text" name="displayName" required  onChange={handleChange} value={displayName}/>
            <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}  />
            <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
            <FormInput label="Confirm Password" type="password" name="confirmPassword" required  onChange={handleChange} value={confirmPassword}/>
            <Button type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm