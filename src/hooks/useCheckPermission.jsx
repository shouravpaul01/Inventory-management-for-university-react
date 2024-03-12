import useAuth from "./useAuth";

const useCheckPermission = (setPermissions) => {
    const { user, logout, isLoading } = useAuth()
    const checkCondition = user?.allPermissions?.filter(permission =>setPermissions.includes(permission))
    if (checkCondition.length>0) {
        return true
    }else{
        return false
    }
//    console.log(checkCondition);
//     return checkCondition
};

export default useCheckPermission;