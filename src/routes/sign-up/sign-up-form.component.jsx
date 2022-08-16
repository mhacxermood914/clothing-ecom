import React, { useState, useRef } from 'react'
import FormInput from '../../components/form-input/form-input.component'
import { createAuthUserWithMailAndPassword, createUserDocumentFromAuth } from './../../utils/firebase/firebase'
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
    <div>
        <h1>Sign up with your email</h1>
        <form onSubmit={handleSubmit} ref={form}>
            <FormInput label="Display Name" type="text" name="displayName" required  onChange={handleChange} value={displayName}/>
            <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}  />
            <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
            <FormInput label="Confirm Password" type="password" name="confirmPassword" required  onChange={handleChange} value={confirmPassword}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default SignUpForm