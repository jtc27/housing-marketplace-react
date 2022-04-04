import { useLocation, useNavigate } from "react-router-dom" 

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"

import { db } from '../firebase.config'

import { toast } from "react-toastify"

import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {

  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const user = result.user

      //check if user.uid 
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      //if user.uid doesn't exist, create new user.uid
      if(!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }

      navigate('/')

    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }


  return (
    <div className="socialLogin">
      <p>{location.pathname === '/sign-in' ? 'Sign In with Google' : 'Register with Google'}</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img src={googleIcon} alt="google" class='socialIconImg' />
      </button>
    </div>
  )
}

export default OAuth