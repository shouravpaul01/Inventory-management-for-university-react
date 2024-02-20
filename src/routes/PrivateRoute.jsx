import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/sharedComponents/Loading";
import useSWR from "swr";
import axiosInstance from "../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const PrivateRoute = ({ children }) => {
   const { user, isLoading } = useAuth()
   const { data: checkApproveUser={} } = useSWR(user?`/user/check-approve-user?email=${user?.email}`:'', fetcher)
   const location = useLocation()
console.log(user,checkApproveUser);
   
   if(isLoading){
      return <Loading />
   }
   if (user && checkApproveUser) {
      return children
   }
   return <Navigate to={'/sign'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;