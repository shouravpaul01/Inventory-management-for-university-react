import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/sharedComponents/Loading";


const PrivateRoute = ({children}) => {
   const {user,isLoading}=useAuth()
   const location=useLocation()
  
   if (isLoading) {
    return <Loading/>
   }
   if (user) {
    return children
   }
   return <Navigate to={'/sign'} state={{from:location}} replace></Navigate>
};

export default PrivateRoute;