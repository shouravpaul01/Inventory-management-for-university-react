import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import getAllRoles from '../../utils/getAllRoles';
import axiosInstance from '../../../axios.config';
import { FaRepeat } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const SetUserRolesFrom = ({roles,handleCloseModal,mutate}) => {
    const [roleOptions, setRoleOptions] = useState(null)

    const { register, handleSubmit, control, reset, setValue, setError, formState: { errors }, } = useForm();

    useEffect(() => {
        if (roles) {
            setValue('_id',roles?.userId)
            setValue('role',roles?.roles)
        }
        axiosInstance.get(`/role`).then(res => {
            const data = res.data?.map(role => role && { _id: role._id, value: role.role, label: role.role })
            setRoleOptions(data)
        })
    }, [roles])
    // const rolesOptions= getAllRoles()
    // const rolesOptions=roles.map(role=>role && {value:role._id,level:role.role})
    console.log(roleOptions);
    const handleUserRoles = (data) => {
        const roleValue=data?.role.map(role=>role._id)
        data['role']=roleValue
        axiosInstance.post(`/user/update-role`,data).then(res=>{
            if (res.data.code==200) {
                mutate()
                document.getElementById(data._id).close()
                handleCloseModal()
                toast.success(res.data.message) 
            }
           
        })
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(handleUserRoles)} className='py-2'>
           {roles && <input type="text" hidden {...register('_id')} />}
            <Controller
                name="role"
                control={control}
                defaultValue={[]}
                rules={{required:'Pls select roles.'}}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={roleOptions}
                        closeMenuOnSelect={false}
                        isMulti
                    />
                )}
            />
            {errors?.roles && <p className="text-red-500">{errors?.roles.message}</p>}
            <button type='submit' className='btn btn-sm btn-primary my-2'><FaRepeat /> Update</button>
        </form>
    );
};

export default SetUserRolesFrom;