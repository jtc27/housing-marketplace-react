import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

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

  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Register</p>
      </header>

      <main>

        <form>
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
 
        {/* google OAuth */}
        <Link to='/sign-in'
        className="registerLink">
        Sign In Page
        </Link>

      </main>
    </div>
    </>
  )
}

export default SignUp