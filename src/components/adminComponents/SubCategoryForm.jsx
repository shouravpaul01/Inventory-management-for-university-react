import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRotateRight, FaCirclePlus } from 'react-icons/fa6';
import axiosInstance from '../../../axios.config';
import { toast } from 'react-toastify';
import useCategories from '../../hooks/useCategories';

const SubCategoryForm = ({ editData,subCategoryMutate }) => {
    const { categories } = useCategories()
    const { register, handleSubmit, reset, setValue, setError, formState: { errors }, } = useForm();
    useEffect(() => {
        if (editData) {
            setValue('_id',editData?._id)
            setValue('category',editData?.category?._id)
            setValue('name',editData?.name)
        }
    }, [editData])

    const showValidationError=(validationErrors)=>{
        validationErrors?.map(validationError => setError(validationError.field, {
            type: 'manual',
            message: validationError.message,
        }))
    }
    const handleStore = (data) => {
        console.log(data);
        axiosInstance.post('/sub-cat', data).then(res => {
            if (res.data.code == 200) {
                subCategoryMutate()
                reset()
                toast.success('hdhdhd')
            } else if (res?.data?.code == 204) {
                showValidationError(res?.data?.validationErrors)
            }

        })
    }
    const handleUpdate = (data) => {
        axiosInstance.patch('/sub-cat', data).then(res => {
            if (res.data.code == 200) {
                document.getElementById(`${data._id}`).close()
                subCategoryMutate()
                reset()
                toast.error(res?.data?.message)
            } else if (res?.data?.code == 204) {
                showValidationError(res?.data?.validationErrors)
            }

        })
    }

    return (
        <form onSubmit={handleSubmit(editData ? handleUpdate : handleStore)} className="p-5 flex gap-2">
            {editData && <input type="hidden" {...register('_id')} />}
            <div className='w-full'>
                <select {...register('category', { required: "The field is required." })} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                    <option value=''>---Select Category---</option>
                    {
                        categories?.data?.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                    }
                </select>
                {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
            </div>
            <div className='w-full'>
                <input type="text" {...register('name', { required: "The field is required." })} placeholder="Category" className="px-4 py-2 w-full  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
            </div>

            <button type="submit" className="btn h-10 min-h-10  btn-primary ">{editData ? <FaArrowRotateRight /> : <FaCirclePlus />}{editData ? 'Úpdate' : 'Add'}</button>


        </form>
    );
};

export default SubCategoryForm;