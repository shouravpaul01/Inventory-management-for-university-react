import React from 'react';
import { FaAngleUp, FaArrowsRotate, FaCircleInfo } from 'react-icons/fa6';
import axiosInstance from '../../../axios.config';
import { toast } from 'react-toastify';

const MyAccessoriesTable = ({myAccessories,mutate,handleShowAllAccessories,setModalId}) => {
    const handleRecievedDistributedAccessories = (distributedId) => {
        axiosInstance.patch(`/distributed-accessories/update-recieved-status/${distributedId}`)
            .then(res => {
                if (res.status = 200) {
                    mutate()
                    toast.success(res.data.message)
                }
            })
    }
    return (
        <div className="overflow-x-auto">
        <table className="table bdistribute-b bdistribute-violet-300">
        {
                myAccessories?.length == 0 && <caption className=" caption-bottom">
                    <div className='flex gap-2 items-center justify-center text-lg py-2'>
                        <FaCircleInfo />
                        <span >Data not found.</span>
                    </div>

                </caption>
            }
            {/* head */}
            <thead className="bg-violet-200 ">
                <tr className="text-base ">

                    <th> </th>
                    <th>InvoiceID</th>
                    <th>Deatials</th>
                    <th>Accessories</th>
                    <th>Recieved Accessories</th>
                </tr>
            </thead>
            <tbody>
                {
                    myAccessories?.map((distribute, index) => <tr key={index}>
                        <th>
                            {index + 1}
                        </th>
                        <td>
                            {distribute?.invoiceId}
                        </td>
                        <td>
                        <div>
                                    <div className="font-bold">{distribute.receiverName}</div>
                                    <div className="text-sm opacity-50">{distribute.receiverEmail}</div>
                                    <span className="badge badge-success">Room No: {distribute?.roomDetails?.roomNo}</span>
                                </div>
                        </td>
                        <td>
                            <div className="indicator">
                                <span className="indicator-item badge badge-secondary">{distribute.accessories?.length}</span>
                                <button onClick={() => { setModalId(distribute?._id), handleShowAllAccessories(distribute?.accessories,myAccessories?.createdAt) }} className="btn btn-xs btn-primary "><FaAngleUp />Accessories</button>
                            </div>
                        </td>
                       
                        
                        <th>
                            {
                                distribute.received?.status ? <span className="badge badge-success ">Yes</span> : <button onClick={() => handleRecievedDistributedAccessories(distribute._id)} className="btn btn-xs btn-primary" ><FaArrowsRotate /> Recieved</button>
                            }
                        </th>
                    </tr>
                    )
                }

            </tbody>
        </table>
    </div>
    );
};

export default MyAccessoriesTable;