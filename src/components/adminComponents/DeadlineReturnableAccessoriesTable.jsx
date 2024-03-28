import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { FaArrowRotateRight, FaCirclePlus, FaPenToSquare } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axios.config';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import Select from 'react-select';
import getReturnAccessories from '../../utils/getReturnAccessories';
import { handleAccessoriesCodeOption, validateAccessoryCode } from '../../utils/utils';

const DeadlineReturnableAccessoriesTable = ({ returnAccessories, setReturnAccessories, ordersMutate, handleShowReturnAccessories }) => {
    const [deadline, setDeadline] = useState(null)
    const [accessoryCode, setAccessoryCode] = useState({})
    const [editData, setEditData] = useState(null)
    
    useEffect(()=>{
        if (returnAccessories) {
            setAccessoryCode({})
            setDeadline(null)
        }
    },[returnAccessories])
    useEffect(()=>{
        if (editData) {
            setDeadline({_id:editData._id,deadline:editData?.deadline})
            setAccessoryCode({_id:editData._id,options:editData?.allCode?.map(code=>code && {value:code,label:code})})
        }
    },[editData])
    const handleSetCodeAndDeadline = (accessoryCode, date, quantity, accessoryId, orderId) => {
        const allCode = accessoryCode.options.map(code => code.value)
        const data = { orderId: orderId, accessoryId: accessoryId, allCode: allCode, deadline: date, quantity: quantity }
        console.log(data);
        axiosInstance.post(`/order/update-order-accessoryCode-deadline`, data)
            .then(res => {
                if (res.status == 200) {
                    handleShowReturnAccessories(returnAccessories?.createdAt, returnAccessories?.orderId)
                    ordersMutate()
                    toast.success(res.data.message)
                }
            })


    }
    console.log(deadline, accessoryCode,'code');
    // console.log(editData, 'editDeadline');
    console.log(returnAccessories.accessories, 'dd');
    return (
        <div className="  overflow-x-visible">
            <table className="table bg-white border-b border-violet-300">
                {/* head */}
                <thead className="bg-green-200 ">
                    <tr className="text-base ">
                        <th>

                        </th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Order Date</th>
                        <th>Set Code</th>
                        <th>Deadline</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        returnAccessories.accessories?.map((accessory, index) => <tr key={index}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                {accessory?.name}
                            </td>
                            <td>
                                {accessory?.quantity}
                            </td>
                            <td>
                                {moment(returnAccessories?.createdAt).format('LL')}
                            </td>
                            <td className='w-72'>
                                {
                                    (accessory?.allCode?.length>0 && editData?._id !== accessory?._id) ? <div>
                                        {
                                            accessory?.allCode?.map((code, index) => <span key={index} className='badge badge-success me-1'>{code}</span>)
                                        }
                                    </div> : <>
                                        <Select
                                            value={accessory._id == accessoryCode._id && accessoryCode?.options}
                                            options={handleAccessoriesCodeOption(accessory.accessoryCode)}
                                            onChange={(value) => setAccessoryCode(prev => {
                                                if (value.length == 0) {
                                                    return { _id: accessory._id, error: 'The Field is required.' }
                                                }else if (value.length > accessory.quantity || value.length < accessory.quantity) {
                                                    return { options: value, _id: accessory._id, error: `Maximum Quantity is ${accessory.quantity}` }
                                                } else {
                                                    return { options: value, _id: accessory._id }
                                                }

                                            })}
                                            closeMenuOnSelect={false}
                                            isMulti
                                        />
                                        {
                                            (accessoryCode._id == accessory._id && accessoryCode?.error) && <p className='text-red-400'>{accessoryCode?.error}</p>
                                        }
                                    </>
                                }



                            </td>
                            <td>
                                {
                                    (accessory?.deadline && editData?._id !== accessory?._id) ? <div className='flex items-center gap-1'>
                                        <p>{moment(accessory?.deadline).format('LL')}</p>

                                    </div> : <div >
                                        <Flatpickr
                                            className={`w-28 input input-sm input-bordered focus:outline-none focus:border-violet-500 `}
                                            placeholder="Select To Date"
                                            value={editData?._id == accessory?._id ? accessory.deadline : (deadline?._id == accessory?._id) && deadline.deadline}
                                            onChange={(selectedDates, dateStr, ins) => {
                                                if (dateStr == '') {
                                                    setDeadline({ _id: accessory?._id, error: 'Select Deadline.' })
                                                } else {
                                                    setDeadline({ _id: accessory?._id, deadline: dateStr })
                                                }

                                            }}
                                            options={{
                                                dateFormat: 'd-M-Y',
                                                static: true
                                            }}
                                        />
                                        {
                                            (deadline?._id == accessory._id && deadline?.error) && <p className='text-red-400'>{deadline?.error}</p>
                                        }
                                    </div>
                                }
                            </td>
                            <td>
                                {
                                    (accessory?.deadline && editData?._id !== accessory?._id) ? <button onClick={() => setEditData({ _id: accessory?._id,allCode:accessory?.allCode, deadline: accessory?.deadline })} className='btn btn-sm btn-circle btn-primary'><FaPenToSquare /></button> : <div className='flex items-center gap-1'>
                                        <button onClick={() => { handleSetCodeAndDeadline(accessoryCode, deadline?.deadline, accessory.quantity, accessory._id, returnAccessories?.orderId), setEditData(null) }} className='btn btn-sm btn-primary' disabled={!(accessoryCode?._id == accessory._id && deadline?._id == accessory._id) || (accessoryCode?.error || deadline?.error)}>{editData?._id == accessory?._id ? <FaArrowRotateRight /> : <FaCirclePlus />} {editData?._id == accessory?._id ? 'Update' : 'Add'}</button>
                                        {
                                            (editData?._id == accessory?._id) && <button onClick={() => setEditData(null)} className='btn btn-sm btn-circle btn-error '>x</button>
                                        }</div>
                                }




                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default DeadlineReturnableAccessoriesTable;