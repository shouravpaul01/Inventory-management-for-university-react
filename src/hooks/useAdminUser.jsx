import useSWR from "swr";
import axiosInstance from "../../axiosConfig";
import useAuth from "./useAuth";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const useAdminUser = () => {
   const {user}=useAuth()

   const { data: adminUser ,mutate ,isLoading:isAdminLoading } = useSWR(`/user/admin-user?email=${user?.email}`, fetcher);
   return {adminUser,isAdminLoading,mutate}
  
};

export default useAdminUser;