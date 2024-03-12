import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/sharedComponents/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const SuperAdminRoute = ({children,roles}) => {
    const { user, isLoading } = useAuth()
    const checkRole=user?.role.map(role=>role.role).filter(element=>roles?.includes(element))
   const location = useLocation()
   
   if(isLoading){
      return <Loading />
   }
   if (user && checkRole.length>0) {
      return children
   }
   return <Navigate to={'/sign'} state={{ from: location }} replace></Navigate>
};

export default SuperAdminRoute;