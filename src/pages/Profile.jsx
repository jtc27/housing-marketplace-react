import { useState } from "react"

import { toast } from "react-toastify"

import { getAuth, updateProfile } from "firebase/auth"
import { updateDoc, doc } from "firebase/firestore"
import {db} from '../firebase.config'

import { useNavigate } from "react-router-dom"



function Profile() {
  const auth = getAuth()

  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')

  }

  const onSubmit = async () => {
  
    try {
      if(auth.currentUser.displayName !== name) {
        //name value is possibly changed in the input field
        //if the name is different, then...

        //update Firebase: displayName replaced with the name value from input
        await updateProfile(auth.currentUser, {
          displayName: name
        }) 

        //update in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }
      
    } catch (error) {
      toast.error('Could not update profile details')
    }


  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }



  return (
  <div className="profile"> 
  <header className="profileHeader">
    <p className="pageHeader">{name} is logged in</p>
    <button className="logOut"
    type='button'
    onClick={onLogout}>
    Logout</button>
  </header>

  <main>
    <div className="profileDetailsHeader">
      <p className="profileDetailsText">Personal Details</p>
      <p className="changePersonalDetails"
      onClick={() => {changeDetails && onSubmit()  //onSubmit updates the personal details
      setChangeDetails((prevState) => !prevState)
      }} >
        {changeDetails ? 'done' : 'change'}
      </p>
    </div>

    <div className="profileCard">
      <form >
        <input 
        type="text" 
        id="name" 
        className={!changeDetails ? 'profileName' : 'profileNameActive'} 
        disabled={!changeDetails} //disables form
        value={name}
        onChange={onChange}
        />

        <input 
        type="text" 
        id="email" 
        className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
        disabled={!changeDetails} //disables form
        value={email}
        onChange={onChange}
        />
      </form>
    </div>
  </main>
  
  </div>)
}

export default Profile