import { useForm } from "react-hook-form";
import axiosInstance from "../../../axios.config";
import { toast } from "react-toastify";
import { FaArrowRotateRight, FaCirclePlus } from "react-icons/fa6";
import { useEffect } from "react";


const CategoryForm = ({ mutate, editData }) => {
    console.log(editData);
    const { register, handleSubmit, reset,setValue, setError, formState: { errors }, } = useForm();

    useEffect(() => {
        if (editData) {
            setValue('_id',editData?._id)
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
        axiosInstance.post('/category', data).then(res => {
            if (res.data.code == 200) {
                mutate()
                reset()
                toast.success('hdhdhd')
            } else if (res?.data?.code == 204) {
               showValidationError(res?.data?.validationErrors)
            }

        })
    }
    const handleUpdate = (data) => {
        console.log(data);
        axiosInstance.patch('/category', data).then(res => {
            if (res.data.code == 200) {
                document.getElementById(`${data._id}`).close()
                mutate()
                reset()
                toast.success(res?.data?.message)
            } else if (res?.data?.code == 204) {
                showValidationError(res?.data?.validationErrors)
            }

        })
    }
    return (
        <form onSubmit={handleSubmit(editData?handleUpdate:handleStore)} className="p-5 flex gap-2">
            <div>
            {editData && <input type="hidden" {...register('_id')} />}
                <input type="text" {...register('name',{required:"The field is required."})} placeholder="Category" className="px-4 py-2 w-full md:w-96 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
            </div>
            <button type="submit" className="btn h-10 min-h-10  btn-primary ">{editData?   <FaArrowRotateRight />:<FaCirclePlus />}{editData? 'Úpdate':'Add'}</button>
        </form>
    );
};

export default CategoryForm;