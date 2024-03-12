
import axiosInstance from "../../axios.config";


const getAllRoles = async()=> {
  const rolesOptions=[]

    axiosInstance.get(`/role`).then(res => {
        const data= res.data?.map(role=>role && {_id:role._id,value:role.role,level:role.role})
        console.log(data,'data');
        rolesOptions.push(...data)
        console.log(rolesOptions,'roles');
        return rolesOptions
     })
     
    
};

export default getAllRoles;