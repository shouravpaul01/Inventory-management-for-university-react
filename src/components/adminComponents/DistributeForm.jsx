import { useForm } from "react-hook-form";
import QuillEditor from "../sharedComponents/QuillEditor";
import { useEffect, useState } from "react";
import roomdetails from '../../JsonData/RoomNO.json'
import { handleRoomNoOptionsByRoomType, handleRoomTypeOptions } from "../../utils/utils";

const DistributeForm = () => {
    const editData = null
    const [isBtnDisable, setIsBtnDisable] = useState(false)
    const [roomType, setRoomType] = useState(' ')
    const [roomNoOptions, setRoomNoOptions] = useState([])
    const { register, handleSubmit, control, reset, setValue, setError, formState: { errors }, } = useForm();
    useEffect(() => { 
            setRoomNoOptions(handleRoomNoOptionsByRoomType(roomType) ) 
    }, [roomType])

    const handleStore = (data) => {
        // setIsBtnDisable(true)
        // console.log(data, 'data');
        // const formData = new FormData();
        // formData.append("file", data.image[0]);
        // formData.append("newData", JSON.stringify(data));

        // axiosInstance.post('/accessory', formData).then(res => {
        //     console.log(res, 'res');
        //     if (res.status == 200) {
        //         mutate()
        //         setImageUrl('')
        //         reset()
        //         toast.success(res?.data?.message)
        //         setIsBtnDisable(false)
        //     } else if (res?.data?.code == 204) {
        //         showValidationError(res?.data?.validationErrors)
        //         setIsBtnDisable(false)
        //     }

        // })
    }
    const handleUpdate = (data) => {
        // console.log(data, 'data');
        // const formData = new FormData();
        // formData.append("file", data.image[0]);
        // formData.append("newData", JSON.stringify(data));
        // axiosInstance.patch('/accessory', formData).then(res => {
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
                <div className='w-full md:basis-1/2'>
                    <input type="text" {...register('receiverEmail', { required: "The field is required." })} placeholder="Reciever Email" className="px-4 py-2 w-full  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                    {errors?.receiverEmail && <p className="text-red-500">{errors?.receiverEmail.message}</p>}
                </div>
                <div className='w-full md:basis-1/4'>
                    <select {...register('roomType', { required: "The field is required." })} onChange={(e) => {setRoomType(e.target.value),setValue('roomNo','')}} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                        <option value=''>---Select Room---</option>
                        {
                            handleRoomTypeOptions()?.map((type, index) => <option key={index} value={type.value}>{type.label}</option>)
                        }
                    </select>
                    {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
                </div>
                <div className='w-full md:basis-1/4'>
                    <select {...register('roomNo', { required: "The field is required." })} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                        <option value=''>---Select Room No---</option>
                        {
                            roomNoOptions?.map((room,index)=> <option key={index} value={room.value}>{room.label}</option>)
                        }
                    </select>
                    {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
                </div>
            </div>







        </form>
    );
};

export default DistributeForm;