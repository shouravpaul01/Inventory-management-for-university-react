import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { FaArrowRotateRight, FaCirclePlus, FaPenToSquare } from 'react-icons/fa6';
import { useState } from 'react';
import axiosInstance from '../../../axios.config';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import getReturnAccessories from '../../utils/getReturnAccessories';

const ReturnAccessoriesTable = ({ returnAccessories,setReturnAccessories,ordersMutate }) => {
    const [deadline, setDeadline] = useState(null)
    const [editDeadline, setEditDeadline] = useState(null)

const handleSetDeadline=(date,orderId)=>{
    if (date) {
        axiosInstance.patch(`/order/update-order-deadline?orderId=${orderId}&accessorieId=${date._id}&date=${date.deadline}`)
    .then(res=>{if (res.data.code==200) {
        const filterAccessories=getReturnAccessories(res.data.data.accessories)
        setReturnAccessories({accessories:filterAccessories,orderId:returnAccessories.orderId})
        ordersMutate()
        toast.success(res.data.message)
    }})
    }
    
}
console.log(returnAccessories?.accessories);
    return (
        <div className="  overflow-x-visible">
            <table className="table bg-white border-b border-violet-300">
                {/* head */}
                <thead className="bg-green-200 ">
                    <tr className="text-base ">
                        <th>

                        </th>
                        <th>Name</th>
                        <th>OrderQty</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        returnAccessories.accessories?.map((accessorie, index) => <tr key={index}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                {accessorie?.name}
                            </td>
                            <td>
                                {accessorie?.orderQuantity}
                            </td>
                            <td>
                                {
                                    (accessorie?.deadline && !editDeadline) ?<div className='flex items-center gap-1'>
                                <p>{moment(accessorie?.deadline).format('LL')}</p>
                                    <button onClick={()=>setEditDeadline({ _id: accessorie?._id, deadline: accessorie?.deadline })} className='btn btn-sm btn-circle btn-primary'><FaPenToSquare /></button>
                                </div>:<div className='flex items-center gap-1'>
                                    <Flatpickr
                                        className={`input input-sm input-bordered focus:outline-none focus:border-violet-500 `}
                                        placeholder="Select To Date"
                                        value={editDeadline?._id==accessorie?._id?accessorie.deadline:(deadline?._id==accessorie?._id) && deadline.deadline}
                                        onChange={(selectedDates, dateStr, ins) => {
                                            setDeadline({ _id: accessorie?._id, deadline: dateStr })
                                        }}
                                        options={{
                                            dateFormat: 'd-M-Y',
                                            static: true
                                        }}
                                    />
                                    <button onClick={()=>{handleSetDeadline(deadline,returnAccessories?.orderId),setEditDeadline(null)}} className='btn btn-sm btn-primary'>{editDeadline?._id==accessorie?._id?<FaArrowRotateRight />:<FaCirclePlus />} {editDeadline?._id==accessorie?._id?'Update':'Add'}</button>
                                    {
                                        (editDeadline?._id==accessorie?._id) && <button onClick={()=>setEditDeadline(null)} className='btn btn-sm btn-circle btn-error '>x</button>
                                    }
                                </div>
                                }
                                </td>

                        </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default ReturnAccessoriesTable;