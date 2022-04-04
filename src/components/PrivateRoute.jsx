import { Navigate, Outlet } from "react-router-dom" 
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

const PrivateRoute = () => {

  const {loggedIn, checkingStatus} = useAuthStatus()

  if (checkingStatus) {
    return <Spinner/>
  }
  /* 
  1. checks status if we are logged in
  2. goes to redirect, OR Outlet private route
  */

  return loggedIn ? <Outlet/> : <Navigate to='/sign-in' />
  // redirects to sign-in page unless loggedIn
}

export default PrivateRoute