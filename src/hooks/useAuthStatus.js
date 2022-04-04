import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setLoggedIn(true)
      }
      setCheckingStatus(false) //we only want to render if setCheckingStatus is false
    })
  })

  return {loggedIn, checkingStatus}
}


