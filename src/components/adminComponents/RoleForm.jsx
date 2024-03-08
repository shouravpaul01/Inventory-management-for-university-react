import { useEffect } from "react";
import axiosInstance from "../../../axios.config";
import { Controller, useForm } from "react-hook-form";
import { FaArrowRotateRight, FaCirclePlus } from "react-icons/fa6";
import Select from 'react-select';
import { toast } from "react-toastify";

const RoleForm = ({ editData, mutate,handleCloseModal }) => {

    const { register, handleSubmit, control, reset, setValue, setError, formState: { errors }, } = useForm();

    useEffect(() => {
        if (editData) {
            setValue('_id', editData?._id)
            setValue('role', { value: editData?.role, label: editData?.role })
            const value = editData?.permissions?.map(permission => permission && { value: permission, label: permission })
            setValue('permissions', value)
        }
    }, [editData])
    console.log(editData);
    const roleOptions = [
        { value: 'Super-admin', label: 'Super-admin' },
        { value: 'User', label: 'User' },
        { value: 'Admin', label: 'Admin' },

    ]
    const permissionsOptions = [
        { value: 'Add', label: 'Add' },
        { value: 'Delete', label: 'Delete' },
        { value: 'Edit', label: 'Edit' },
    ]
    const showValidationError = (validationErrors) => {
        validationErrors?.map(validationError => setError(validationError.field, {
            type: 'manual',
            message: validationError.message,
        }))
    }

    const handleStore = (data) => {
        const role = { role: data.role.value, permissions: data.permissions.map(permission => permission.value) }
        axiosInstance.post('/role', role).then(res => {
            if (res.data.code == 200) {
                reset()
                mutate()
                toast.success(res.data?.message)
            } else if (res?.data?.code == 204) {
                showValidationError(res?.data?.validationErrors)
            }

        })
    }
    const handleUpdate = (data) => {

        const roleUpdate = { _id:data._id, role: data.role.value, permissions: data.permissions.map(permission => permission.value) }
        console.log(roleUpdate);
        axiosInstance.patch('/role', roleUpdate).then(res => {
            if (res.data.code == 200) {
                document.getElementById(`${data._id}`).close()
                handleCloseModal()
                mutate()
                reset()
                toast.success(res?.data?.message)
            } else if (res?.data?.code == 204) {
              
                showValidationError(res?.data?.validationErrors)
            }

        })
    }
    return (
        <form onSubmit={handleSubmit(editData ? handleUpdate : handleStore)} className="p-5 flex flex-col lg:flex-row gap-2">
            <div className="basis-1/2">
                {editData && <input type="hidden" {...register('_id')} />}
                <Controller
                    name="role"
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                        <Select
                            {...field}
                            closeMenuOnSelect={false}
                            options={roleOptions}
                        />
                    )}
                />
                {errors?.role && <p className="text-red-500">{errors?.role.message}</p>}
            </div>
            <div className="basis-1/2">
                <Controller
                    name="permissions"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={permissionsOptions}
                            closeMenuOnSelect={false}
                            isMulti
                        />
                    )}
                />

            </div>
            <button type="submit" className="btn h-10 min-h-10  btn-primary ">{editData ? <FaArrowRotateRight /> : <FaCirclePlus />}{editData ? 'Úpdate' : 'Add'}</button>
        </form>
    );
};

export default RoleForm;