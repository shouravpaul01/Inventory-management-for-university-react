import { toast } from "react-toastify";
import axiosInstance from "../../../axios.config";
import getReturnAccessories from "../../utils/getReturnAccessories";
import { FaAngleUp, FaArrowsRotate, FaCircleInfo } from "react-icons/fa6";

const MyOrderTable = ({ myOrders,myOrderMutate, handleShowReturnAccessoris, handleShowAllAccessoris, setModalId }) => {
    const handleRecievedOrder = (orderId) => {
        axiosInstance.patch(`/order/update-recieved-status/${orderId}`)
            .then(res => {
                if (res.data.code = 200) {
                    myOrderMutate()
                    toast.success(res.data.message)
                }
            })
    }
    console.log(myOrders);
    return (
        <div className="overflow-x-auto">
            <table className="table border-b border-violet-300">
            {
                    myOrders?.length == 0 && <caption className=" caption-bottom">
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
                        <th>Accessories</th>
                        <th>Approved</th>
                        <th>Returnable</th>
                        <th>Recieved Order</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders?.map((order, index) => <tr key={index}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                                {order?.invoiceId}
                            </td>
                            <td>
                                <div className="indicator">
                                    <span className="indicator-item badge badge-secondary">{order.accessories?.length}</span>
                                    <button onClick={() => { setModalId(order?._id), handleShowAllAccessoris(order?.accessories,myOrders?.createdAt) }} className="btn btn-xs btn-primary "><FaAngleUp />Accessories</button>
                                </div>
                            </td>
                            <td><span className={`badge  ${order?.approveStatus ? 'badge-warning' : 'badge-error'}`}>{order?.approveStatus ? "Approve" : "Pending"}</span> </td>
                            <th>
                                {

                                      <div className="indicator"  >
                                        <span className="indicator-item badge badge-secondary">{getReturnAccessories(order?.accessories).length}</span>
                                        <button onClick={() => { setModalId(order?._id), handleShowReturnAccessoris(order?._id,myOrders?.createdAt) }} className="btn btn-xs btn-primary " disabled={!(order?.approveStatus && order.recievedOrder?.status)}><FaAngleUp /> Return Accessories</button>
                                    </div>
                                }
                            </th>
                            <th>
                                {
                                    order.recievedOrder?.status ? <span className="badge badge-success ">Yes</span> : <button onClick={() => handleRecievedOrder(order._id)} className="btn btn-xs btn-primary" disabled={!order?.approveStatus}><FaArrowsRotate /> Recieved</button>
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

export default MyOrderTable;