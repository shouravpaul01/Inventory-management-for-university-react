import { toast } from "react-toastify";
import axiosInstance from "../../../axios.config";
import getReturnAccessories from "../../utils/getReturnAccessories";
import { FaAngleUp, FaArrowRightArrowLeft, FaCircleInfo, FaPrint, FaRegTrashCan } from "react-icons/fa6";
import useCheckPermission from "../../hooks/useCheckPermission";
import { getDeadlineReturnAccessories } from "../../utils/utils";


const OrderTable = ({ orders, mutate, handleShowReturnAccessoris,setReturnAccessories, handleShowAllAccessoris, setModalId }) => {
    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'Order status'])
    const checkDeletePermission = useCheckPermission(['All', 'Order delete'])

    const handleStatus = (_id, approveStatus) => {
        axiosInstance.patch(`/order/update-approve-status/?_id=${_id}&approveStatus=${approveStatus}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })
    }
    const handleDelete = (_id) => {
        axiosInstance.delete(`/order/${_id}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
            setReturnAccessories(null)
        })
    }
    
    return (
        <div className="overflow-x-auto my-3">
            <table className="table bg-white border-b border-violet-300">
            {
                        orders?.length == 0 && <caption className=" caption-bottom">
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
                        <th>Accessories</th>
                        <th>Set Return Deadline</th>
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
                        orders?.map((order, index) => <tr key={index}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                {order?.invoiceId}
                            </td>
                            <td>
                                <div className="indicator">
                                    <span className="indicator-item badge badge-secondary">{order.accessories?.length}</span>
                                    <button onClick={() => { setModalId(order?._id), handleShowAllAccessoris(order?.accessories) }} className="btn btn-xs btn-primary "><FaAngleUp /> Accessoris</button>
                                </div>
                            </td>
                            <th>
                                {

                                    <div className="indicator">
                                        <span className="indicator-item badge badge-secondary">{getReturnAccessories(order?.accessories)?.length}</span>
                                        <button onClick={() => { handleShowReturnAccessoris(getReturnAccessories(order?.accessories),orders?.createdAt, order?._id) }} className="btn btn-xs btn-primary "><FaAngleUp /> Return Accessories</button>
                                    </div>
                                }
                            </th>
                            {
                                //Condition of Permission
                                //The Button will  disable when don't set deadline of all returnable accessories
                                checkStatusPermission  && <td>
                                    <button onClick={() => handleStatus(order?._id, order?.approveStatus ? false : true)} className={`btn btn-xs uppercase ${order?.approveStatus ? 'btn-primary' : 'btn-error'}`} disabled={getDeadlineReturnAccessories(order?.accessories)?.length!==getReturnAccessories(order?.accessories).length}><FaArrowRightArrowLeft /> {order?.approveStatus ? "Approve" : "Pending"}</button>
                                </td>

                            }
                            <td>
                                <span className={`badge ${order.recievedOrder?.status ? 'badge-success' : 'badge-error'}`}>{order.recievedOrder?.status ? 'Yes' : 'No'}</span>
                            </td>
                            <td>
                                <div className="flex gap-1">
                                <button className={`btn btn-xs uppercase btn-primary `} disabled={order?.approveStatus ? false : true}><FaPrint /> Print</button>
                                {
                                        //Condition of permission
                                        checkDeletePermission && <button onClick={() => handleDelete(order?._id)} className="btn  btn-xs btn-circle btn-error"><FaRegTrashCan /></button>
                                    }
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

export default OrderTable;