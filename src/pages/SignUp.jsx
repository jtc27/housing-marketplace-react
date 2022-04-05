import { toast } from "react-toastify"

import OAuth from "../components/OAuth"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.config'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {name, email, password} = formData //destructured from formData state

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value 
      //e.target.id gets the "id" for either email or password
      // email: e.target.value  OR  password: e.target.value 
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      /*AUTH completed, Begin DB update */

      const formDataCopy = {...formData} 
      //copy of the formData State, we don't want to change original state
      delete formDataCopy.password
      //I don't want password to get sent to DB
      formDataCopy.timestamp = serverTimestamp()
      // adds timestamp property to object

      /*Begin DB update */
      await setDoc(doc(db, 'users', user.uid), formDataCopy)


      navigate('/')

    } catch (error) {
      toast.error('Registration error')
    }
  }

  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Registration Page</p>
      </header>

      <main>

        <form onSubmit={onSubmit}>
         <input type="text" className="nameInput" placeholder="Name" id="name" 
          value={name} //name from formData state
          onChange={onChange}
          />

          <input type="email" className="emailInput" placeholder="Email" id="email" 
          value={email} //email from formData state
          onChange={onChange}
          />

          <div className="passwordInputDiv">
          <input type={showPassword ? 'text' : 'password'} className='passwordInput' 
          placeholder="password"
          id='password'
          value={password} //password from formData state
          onChange={onChange}
          />

          <img src={visibilityIcon} alt="show password" className="showPassword" 
          onClick={() => setShowPassword((prevState) => !prevState)}  
          />
          </div>

        <Link to='/forgot-password'
        className="forgotPasswordLink">
        Forgot Password
        </Link>

        <div className="signUpBar">
          <p className="signUpText">Register</p>
          <button className="signUpButton">
            <ArrowRightIcon fill='#ffffff'
            width='34px' height='34px' />
          </button>
        </div>
        </form>
 
        
        <Link to='/sign-in'
        className="registerLink">
        Go to Sign In Page
        </Link>
        <OAuth />

      </main>
    </div>
    </>
  )
}

export default SignUp