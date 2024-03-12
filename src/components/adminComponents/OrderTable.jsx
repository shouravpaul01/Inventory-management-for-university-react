import { toast } from "react-toastify";
import axiosInstance from "../../../axios.config";
import getReturnAccessories from "../../utils/getReturnAccessories";
import { FaAngleUp, FaArrowRightArrowLeft, FaPrint } from "react-icons/fa6";
import useCheckPermission from "../../hooks/useCheckPermission";


const OrderTable = ({ orders, mutate, handleShowReturnAccessoris, handleShowAllAccessoris, setModalId }) => {
    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'Order status'])
    const checkDeletePermission = useCheckPermission(['All', 'Order delete'])

    const handleStatus = (_id, approveStatus) => {
        axiosInstance.patch(`/order/update-approve-status/?_id=${_id}&approveStatus=${approveStatus}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })
    }
    return (
        <div className="overflow-x-auto my-3">
            <table className="table bg-white border-b border-violet-300">
                {/* head */}
                <thead className="bg-green-200 ">
                    <tr className="text-base ">

                        <th> </th>
                        <th>InvoiceID</th>
                        <th>Accessories</th>
                        <th>Return</th>
                        {
                            //Condition of Permission
                            checkStatusPermission && <th>Approve</th>
                        }
                        <th>Reciept</th>
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
                                        <span className="indicator-item badge badge-secondary">{getReturnAccessories(order?.accessories).length}</span>
                                        <button onClick={() => { handleShowReturnAccessoris(getReturnAccessories(order?.accessories), order?._id) }} className="btn btn-xs btn-primary "><FaAngleUp /> Return Accessories</button>
                                    </div>
                                }
                            </th>
                            {
                                //Condition of Permission
                                checkStatusPermission && <td>
                                    <button onClick={() => handleStatus(order?._id, order?.approveStatus ? false : true)} className={`btn btn-xs uppercase ${order?.approveStatus ? 'btn-primary' : 'btn-error'}`}><FaArrowRightArrowLeft /> {order?.approveStatus ? "Approve" : "Pending"}</button>
                                </td>

                            }
                            <td>
                                <span className={`badge ${order.recieptStatus?.user ? 'badge-success' : 'badge-error'}`}>{order.recieptStatus?.user ? 'Yes' : 'No'}</span>
                            </td>
                            <td>  <button className={`btn btn-xs uppercase btn-primary `} disabled={order?.approveStatus ? false : true}><FaPrint /> Print</button></td>
                        </tr>
                        )
                    }

                </tbody>


            </table>
        </div>
    );
};

export default OrderTable;