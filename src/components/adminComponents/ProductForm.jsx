import { Controller, useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import axiosInstance from "../../../axios.config";
import { FaArrowRotateRight, FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import useSubCatByCategory from "../../hooks/useSubCatByCategory";
import QuillEditor from "../sharedComponents/QuillEditor";
import blankImage from '../../assets/Images/movieImg.png'


const ProductForm = ({ productMutate,editData }) => {
    const [categoryId, setCategoryId] = useState('')
    const { categories } = useCategories()
    const { subCategories } = useSubCatByCategory(categoryId)
    const { register, handleSubmit, control, reset, setValue, setError, formState: { errors }, } = useForm();

    useEffect(() => {
        if (editData) {
            setValue('_id',editData?._id)
            setValue('name',editData?.name)
            setValue('category',editData?.category?._id)
            setCategoryId(editData?.category?._id)
            setValue('subCategory',editData?.subCategory?._id)
            setValue('quantity',editData?.quantity)
            editData?.returnStatus=='Yes'?document.getElementById('returnStatusYes').checked=true:document.getElementById('returnStatusNo').checked=true
            

        }
    }, [editData])


    const showValidationError = (validationErrors) => {
        validationErrors?.map(validationError => setError(validationError.field, {
            type: 'manual',
            message: validationError.message,
        }))
    }
    const handleStore = (data) => {
        const formData = new FormData();
        formData.append("file", data.image[0] );
        formData.append("newData", JSON.stringify(data));
        
        axiosInstance.post('/product', formData).then(res => {
            if (res.data.code == 200) {
                productMutate()
                reset()
                toast.success(res?.data?.message)
            } else if (res?.data?.code == 204) {
                showValidationError(res?.data?.validationErrors)
            }

        })
    }
    const handleUpdate = (data) => {
        console.log(data);
        // axiosInstance.patch('/category', data).then(res => {
        //     if (res.data.code == 200) {
        //         document.getElementById(`${data._id}`).close()
        //         mutate()
        //         reset()
        //         toast.success(res?.data?.message)
        //     } else if (res?.data?.code == 204) {
        //         showValidationError(res?.data?.validationErrors)
        //     }

        // })
    }
    return (
        <form onSubmit={handleSubmit(editData ? handleUpdate : handleStore)} className="p-5 space-y-2">
            {editData && <input type="hidden" {...register('_id')} />}
            <div className="flex gap-2">
                <div className='w-full'>
                    <input type="text" {...register('name', { required: "The field is required." })} placeholder="Product Name" className="px-4 py-2 w-full  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    {errors?.name && <p className="text-red-500">{errors?.name.message}</p>}
                </div>
                <div className='w-full'>
                    <select {...register('category', { required: "The field is required." })} onChange={(e) => setCategoryId(e.target.value)} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                        <option value=''>---Select Category---</option>
                        {
                            categories?.data?.map(category => <option key={category._id} value={category._id}>{category.name}</option>)
                        }
                    </select>
                    {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
                </div>
            </div>
            <div className="flex gap-2">

                <div className='w-full'>
                    <select {...register('subCategory', { required: "The field is required." })} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                        <option value=''>---Select Sub Category---</option>
                        {
                            subCategories?.map(subCategory => <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>)
                        }
                    </select>
                    {errors?.subCategory && <p className="text-red-500">{errors?.subCategory.message}</p>}
                </div>
                <div className='w-full'>
                    <input type="text" {...register('quantity', { required: "The field is required." })} placeholder="Quantity" className="px-4 py-2 w-full  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    {errors?.quantity && <p className="text-red-500">{errors?.quantity.message}</p>}
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="basis-1/2 space-y-2">
                    <img src={blankImage} className="w-28 h-28 bg-white outline outline-1 outline-indigo-500 rounded-md" />
                    <input type="file" {...register('image', { required: "The Field is required." })} className="file-input file-input-bordered file-input-primary w-full " />
                    {errors?.image && <p className="text-red-500">{errors?.image.message}</p>}
                </div>
                <div className="w-full md:w-1/2 ms-8 space-y-3">
                    <label className="font-bold text-base">Reaturn Status</label>
                    <div className="flex items-center gap-6 ms-3">
                        <input type="radio" {...register('returnStatus',{ required: "The Field is required." })} value={'Yes'}   className="radio radio-primary" id="returnStatusYes"/>
                        <label >Yes</label>
                    </div>
                    <div className="flex items-center gap-6 ms-3">
                        <input type="radio" {...register('returnStatus',{ required: "The Field is required." })} value={'No'}  className="radio radio-primary" id="returnStatusNo"/>
                        <label >No</label>
                    </div>
                    {errors?.returnStatus && <p className="text-red-500">{errors?.returnStatus.message}</p>}
                </div>
            </div>
            <div className="w-full ">
                <Controller
                    name="description"
                    control={control}
                    rules={{required:'The field is required.'}}
                    defaultValue=""
                    render={({ field }) => <QuillEditor field={field} placeholder={'Description'} />}
                />
                 {errors?.description && <p className="text-red-500">{errors?.description.message}</p>}
            </div>
            <button type="submit" className="btn h-10 min-h-10  btn-primary ">{editData ? <FaArrowRotateRight /> : <FaCirclePlus />}{editData ? 'Úpdate' : 'Add'}</button>


        </form>
    );
};

export default ProductForm;