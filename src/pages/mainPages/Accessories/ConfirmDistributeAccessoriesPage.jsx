import { useEffect, useState } from "react";
import { handleAccessoriesCodeOption, handleRoomNoOptionsByRoomType, handleRoomTypeOptions, validateAccessoryCode } from "../../../utils/utils";
import { Controller, useForm } from "react-hook-form";
import {  useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../axios.config";
import Select from 'react-select';
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import useSelectedAccessories from "../../../hooks/useSelectedAccessories";


const ConfirmDistributeAccessoriesPage = () => {
    const { setSelectedTotalAccessories } = useSelectedAccessories()
    const [isBtnDisable, setIsBtnDisable] = useState(false)
    const [roomType, setRoomType] = useState(' ')
    const [roomNoOptions, setRoomNoOptions] = useState([])
    const [checkedRoomType, setCheckedRoomType] = useState('Teachers room')
    const [allUsers, setAllUsers] = useState(null)
    const [selectedEmail, setSelectedEmail] = useState(null)
    const [receiverEmailOptions, setReceiverEmailOptions] = useState(null)
    const location = useLocation()
    const { accessories } = location.state || {};
    const navigate=useNavigate()
    
    console.log(accessories, 'accessories');
    console.log(checkedRoomType, 'checkedRoomType');
    const { register, handleSubmit, control, reset, setValue, setError, formState: { errors }, } = useForm();

    useEffect(() => {
        axiosInstance.get('/user/all-approve-user').then(res => {
            setAllUsers(res.data)
            setReceiverEmailOptions(res.data.map(user => user && { value: user.email, label: user.email }))
        })
    }, [])
    useEffect(() => {
        setRoomNoOptions(handleRoomNoOptionsByRoomType(roomType))
        if (selectedEmail && checkedRoomType == 'Teachers room') {
            const user = allUsers.find(user => user.email == selectedEmail)
            setValue('receiverName', user.name)
            setValue('roomType', 'Teachers room')
            setValue('roomNo', user.roomNo)
        }

    }, [roomType, selectedEmail, allUsers, checkedRoomType])
    useEffect(() => {

        if (checkedRoomType == 'Teachers room') {
            setValue('receiverName', '')
            setValue('receiverEmail', '')
            setValue('roomType', '')
            setValue('roomNo', '')
        }
        if (checkedRoomType == 'Others room') {
            setValue('receiverName', '')
            setValue('receiverEmail', '')
            setValue('roomType', '')
            setValue('roomNo', '')
        }

    }, [checkedRoomType])
   
    if (!accessories) {
        return navigate('/',{replace:true})
     }
    
    const handleConfirmAccessories = (data) => {
        
        const findAccessory=accessories.map(accessory=>{   
           if (data[`${accessory._id}`]) {
            const allCode=data[`${accessory._id}`]?.map(code=>code && code.value)
            console.log(allCode,data[`${accessory._id}`].allCode);
            return {...accessory,allCode:allCode,isItReturnable:'Fixed'}
           }else{
            return {...accessory,allCode:[],isItReturnable:'Fixed'}
           }
        })
        data.accessories=findAccessory
        data.roomDetails={roomType:data.roomType,roomNo:data.roomNo}
        console.log(data,'eejjd');
        axiosInstance.post('/distributed-accessories',data).then(res=>{
            console.log(res);
            if (res.status==200) {
                toast.success(res.data.message)
                setSelectedTotalAccessories([])
                navigate('/')
            }
        })
    }
    
    return (
        <div className="my-container ">
            <div className="px-5 py-8">
                <p className="font-bold text-2xl text-violet-600 border-b border-violet-600 pb-1 ">Accessories Distribution</p>
                <input type="text" {...register('receiverName')} hidden/>
                <div className="flex gap-6 pt-2">
                    <div className="flex items-center gap-2 font-semibold">
                        <input type="radio" name="radio-10" value={'Teachers room'} onChange={(e) => setCheckedRoomType(e.target.value)} className="radio radio-primary" checked={checkedRoomType == 'Teachers room'} />
                        <label> Teachers Room</label>
                    </div>

                    <div className="flex items-center gap-2 font-semibold">
                        <input type="radio" name="radio-10" value={'Others room'} onChange={(e) => setCheckedRoomType(e.target.value)} className="radio radio-primary" />
                        <label> Others Room</label>
                    </div>
                </div>
                <form onSubmit={handleSubmit( handleConfirmAccessories)} className="space-y-2 py-4">
                    <div className="flex flex-col md:flex-row gap-2">
                        <div className='w-full md:basis-1/2'>
                            <select {...register('receiverEmail', { required: "The field is required." })} onChange={(e) => setSelectedEmail(e.target.value)} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                                <option value=''>---Select Room---</option>
                                {
                                    receiverEmailOptions?.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)
                                }
                            </select>
                            {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
                        </div>
                        {
                            checkedRoomType == 'Others room' && <>
                                <div className='w-full md:basis-1/4'>
                                    <select {...register('roomType', { required: "The field is required." })} onChange={(e) => { setRoomType(e.target.value), setValue('roomNo', '') }} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
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
                                            roomNoOptions?.map((room, index) => <option key={index} value={room.value}>{room.label}</option>)
                                        }
                                    </select>
                                    {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
                                </div>
                            </>
                        }
                        {
                            checkedRoomType == 'Teachers room' && <>
                                <div className='w-full md:basis-1/4'>
                                    <input type="text" {...register('roomType', { required: "The field is required." })} placeholder="Room Type" className="px-4 py-2 w-full  border border-gray-300 rounded-md focus:outline-none " readOnly />
                                    {errors?.receiverEmail && <p className="text-red-500">{errors?.receiverEmail.message}</p>}

                                </div>
                                <div className='w-full md:basis-1/4'>
                                    <input type="text" {...register('roomNo', { required: "The field is required." })} placeholder="Room No" className="px-4 py-2 w-full  border border-gray-300 rounded-md focus:outline-none " readOnly />
                                    {errors?.receiverEmail && <p className="text-red-500">{errors?.receiverEmail.message}</p>}

                                </div>
                            </>
                        }

                    </div>

                    <div className="overflow-x-auto md:overflow-x-visible bg-white ">
                        <div>
                        <table className="table">
                            <thead className="bg-violet-200 ">
                                <tr className="text-base ">

                                    <th> </th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Select Accessory Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accessories && accessories?.map((accessory, index) => <tr key={index}>
                                        <th>{index+1}</th>
                                        <th> {accessory.name}</th>
                                        <th> {accessory.quantity}</th>
                                        <th className="w-1/2">
                                            {
                                                accessory?.isItReturnable=='Yes' && <>
                                                <Controller
                                                name={accessory._id}
                                                control={control}
                                                defaultValue={[]}
                                                rules={{required:'Select Accessory Code.',validate:(value)=>validateAccessoryCode(value,accessory.quantity)}}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        
                                                        options={handleAccessoriesCodeOption(accessory.code)}
                                                        closeMenuOnSelect={false}
                                                        isMulti
                                                    />  
                                                )} 
                                                />
                                                 {errors[`${accessory._id}`] && <p className="text-red-500">{errors[`${accessory._id}`].message}</p>}
                                                </>
                                            }
                                        </th>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="text-end pt-5">
                    <button type="submit"  className="btn btn-sm btn-primary rounded-full font-bold me-3" ><FaArrowRight />  Confirm Accessories</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default ConfirmDistributeAccessoriesPage;