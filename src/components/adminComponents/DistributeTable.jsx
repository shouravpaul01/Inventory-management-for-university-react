import { FaAngleUp, FaArrowRightArrowLeft, FaCircleInfo, FaPrint, FaRegTrashCan } from "react-icons/fa6";
import useCheckPermission from "../../hooks/useCheckPermission";
import axiosInstance from "../../../axios.config";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const DistributeTable = ({ distributedAccessories, mutate, handleShowAllAccessoris, setModalId }) => {
    const {user}=useAuth()

    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'distributed status'])
    const checkDeletePermission = useCheckPermission(['All', 'distributed delete'])

    const handleStatus = (_id, approveStatus) => {
        axiosInstance.patch(`/distributed-accessories/update-approve-status/?email=${user?.email}&_id=${_id}&approveStatus=${approveStatus}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })
    }
    //    const handleDelete = (_id) => {
    //        axiosInstance.delete(`/distributed-accessories/${_id}`).then(res => {
    //            mutate()
    //            toast.success(res?.data?.message)
    //            setReturnAccessories(null)
    //        })
    //    }

    return (
        <div className="overflow-x-auto my-3">
            <table className="table bg-white border-b border-violet-300">
                {
                    distributedAccessories?.length == 0 && <caption className=" caption-bottom">
                        <div className='flex gap-2 items-center justify-center text-lg py-2'>
                            <FaCircleInfo />
                            <span className=''>Data not found.</span>
                        </div>
                    </caption>
                }
                {/* head */}
                <thead className="bg-green-200 ">
                    <tr className="text-base ">

                        <th> </th>
                        <th>InvoiceID</th>
                        <th>Name</th>
                        <th>Accessories</th>

                        {
                            //Condition of Permission
                            checkStatusPermission && <th>Approve</th>
                        }
                        <th>User Recieved</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        distributedAccessories?.map((distribute, index) => <tr key={index}>
                            <th>
                                {index + 1}
                            </th>
                           
                            <td>
                                {distribute?.invoiceId}
                            </td>
                            <th>
                                <div>
                                    <div className="font-bold">{distribute.receiverName}</div>
                                    <div className="text-sm opacity-50">{distribute.receiverEmail}</div>
                                    <span className="badge badge-success">Room No: {distribute?.roomDetails?.roomNo}</span>
                                </div>
                            </th>
                            <td>
                                <div className="indicator">
                                    <span className="indicator-item badge badge-secondary">{distribute.accessories?.length}</span>
                                    <button onClick={() => { setModalId(distribute?._id), handleShowAllAccessoris(distribute?.accessories) }} className="btn btn-xs btn-primary "><FaAngleUp /> Accessoris</button>

                                </div>
                            </td>
                            <td> {
                                //Condition of Permission
                                checkStatusPermission ?<button onClick={() => handleStatus(distribute?._id, distribute?.approve?.status ? false : true)} className={`btn btn-xs uppercase ${distribute?.approve?.status? 'btn-primary' : 'btn-error'}`} ><FaArrowRightArrowLeft /> {distribute?.approve?.status ? "Approve" : "Pending"}</button>:<span className={`badge uppercase ${distribute?.approve?.status ? 'badge-primary' : 'badge-error'}`} >{distribute?.approve?.status ? "Approve" : "Pending"}</span>
                                    
                                

                            }
                            </td>

                            <td>
                                <span className={`badge ${distribute.received?.status ? 'badge-success' : 'badge-error'}`}>{distribute.received?.status ? 'Yes' : 'No'}</span>
                            </td>
                            <td>
                                <div className="flex gap-1">
                                    <button className={`btn btn-xs uppercase btn-primary `} disabled={distribute?.approve?.status  ? false : true}><FaPrint /> Print</button>
                                    {/* {
                                       //Condition of permission
                                       checkDeletePermission && <button onClick={() => handleDelete(distribute?._id)} className="btn  btn-xs btn-circle btn-error"><FaRegTrashCan /></button>
                                   } */}
                                </div>
                            </td>
                        </tr>
                        )
                    }

                </tbody>


            </table>
        </div>
    );
};

export default DistributeTable;