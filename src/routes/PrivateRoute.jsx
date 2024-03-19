import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/sharedComponents/Loading";

const PrivateRoute = ({ children,roles }) => {
   const { user, isLoading } = useAuth()
   const location = useLocation()
   const checkRole=user?.role.map(role=>role.role).filter(element=>roles?.includes(element))
   console.log(user);
   console.log(checkRole,'checkRole');
   console.log(roles,'roles');
   if(isLoading){
      return <Loading />
   }
   if (user && checkRole?.length>0) {
      return children
   }
   return <Navigate to={'/sign'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;