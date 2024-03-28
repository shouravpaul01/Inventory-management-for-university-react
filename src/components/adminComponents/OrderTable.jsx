import { toast } from "react-toastify";
import axiosInstance from "../../../axios.config";
import getReturnAccessories from "../../utils/getReturnAccessories";
import { FaAngleUp, FaArrowRightArrowLeft, FaCheck, FaCircleInfo, FaExclamation, FaPrint, FaRegTrashCan } from "react-icons/fa6";
import useCheckPermission from "../../hooks/useCheckPermission";
import { getDeadlineReturnAccessories } from "../../utils/utils";
import useAuth from "../../hooks/useAuth";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import PrintConfirmOrder from "./PrintConfirmOrder";


const OrderTable = ({ orders, mutate, handleShowReturnAccessories, setReturnAccessories, handleShowAllAccessories, setModalId }) => {
    const componentRef = useRef();
    const [printOrderData,setPrintOrderData]=useState(null)
console.log(printOrderData);
    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'Order status'])
    const checkDeletePermission = useCheckPermission(['All', 'Order delete'])
    const { user } = useAuth()

    const handleConfirmOrderPrint = useReactToPrint({
        content: () => componentRef.current,
    
    });
    const handleStatus = (_id, approveStatus) => {
        console.log(_id, approveStatus);
        axiosInstance.patch(`/order/update-approve-status?_id=${_id}&approveStatus=${approveStatus}&email=${user?.email}`).then(res => {
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
                        <th>Approved</th>
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
                                    <button onClick={() => { setModalId(order?._id), handleShowAllAccessories(order?.accessories) }} className="btn btn-xs btn-primary "><FaAngleUp /> Accessoris</button>
                                </div>
                            </td>
                            <th>
                                {

                                    <div className="indicator">
                                        <span className="indicator-item badge badge-secondary">{getReturnAccessories(order?.accessories)?.length}</span>
                                        <button onClick={() => { handleShowReturnAccessories(orders?.createdAt, order?._id) }} className="btn btn-xs btn-primary "><FaAngleUp /> Returnable Accessories</button>
                                    </div>
                                }
                            </th>

                            {/* //Condition of Permission
                                //The Button will  disable when don't set deadline of all returnable accessories */}
                            <td>

                                {
                                    checkStatusPermission ? <>
                                        {
                                            order?.approve?.status ? <span className={`badge  ${order?.approve?.status ? 'badge-success' : 'badge-error'}`}>{order?.approve?.status ? <FaCheck /> : <FaExclamation />}{order?.approve?.status ? "Approve" : "Pending"}</span> : <button onClick={() => handleStatus(order?._id, order?.approve?.status ? false : true)} className={`btn btn-xs uppercase ${order?.approve?.status ? 'btn-primary' : 'btn-error'}`} disabled={getDeadlineReturnAccessories(order?.accessories)?.length !== getReturnAccessories(order?.accessories).length}><FaArrowRightArrowLeft /> {order?.approve?.status ? "Approve" : "Pending"}</button>
                                        }
                                    </> : <span className={`badge  ${order?.approve?.status ? 'badge-success' : 'badge-error'}`}>{order?.approve?.status ? <FaCheck /> : <FaExclamation />}{order?.approve?.status ? "Approve" : "Pending"}</span>
                                }

                            </td>
                            <td>
                                <span className={`badge ${order.recievedOrder?.status ? 'badge-success' : 'badge-error'}`}>{order.recievedOrder?.status ? 'Yes' : 'No'}</span>
                            </td>
                            <td>
                                <div className="flex gap-1">
                                    <button onClick={()=> {handleConfirmOrderPrint(),setPrintOrderData(order)}} className={`btn btn-xs uppercase btn-primary `} disabled={order?.approve?.status ? false : true}><FaPrint /> Print</button>
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
            <div  className="hidden">
                    <div ref={componentRef}>
                    <PrintConfirmOrder printOrderData={printOrderData} />
                    </div>
            </div>
        </div>
    );
};

export default OrderTable;