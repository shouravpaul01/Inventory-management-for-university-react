import { toast } from "react-toastify";
import axiosInstance from "../../../axios.config";
import getReturnAccessories from "../../utils/getReturnAccessories";
import { FaAngleUp, FaArrowUp, FaArrowsRotate } from "react-icons/fa6";

const MyOrderTable = ({myOrders,handleShowReturnAccessoris,handleShowAllAccessoris,setModalId}) => {
    const handleReciept=(orderId)=>{
        axiosInstance.patch(`/order/update-reciept-status/${orderId}`)
        .then(res=>{
            if(res.data.code=200){
               toast.success(res.data.message) 
            }
        })
    }
    return (
        <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">

                            <th> </th>
                            <th>InvoiceID</th>
                            <th>Accessories</th>
                            <th>Approve</th>
                            <th>Return</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders?.map((order, index) => <tr key={index}>
                                <th>
                                    {index+1}
                                </th>
                                <td>
                                    {order?.invoiceId}
                                </td>
                                <td>
                                    <div className="indicator">
                                        <span className="indicator-item badge badge-secondary">{order.accessories?.length}</span>
                                        <button onClick={()=>{setModalId(order?._id),handleShowAllAccessoris(order?.accessories)}} className="btn btn-xs btn-primary "><FaAngleUp />Accessories</button>
                                    </div>
                                </td>
                                <td><span className={`badge  ${order?.approveStatus ? 'badge-warning' : 'badge-error'}`}>{order?.approveStatus? "Approve" : "Pending"}</span> </td>
                                <th>
                                    {

                                        <div className="indicator">
                                            <span className="indicator-item badge badge-secondary">{getReturnAccessories(order?.accessories).length}</span>
                                            <button onClick={() =>{setModalId(order?._id), handleShowReturnAccessoris(getReturnAccessories(order?.accessories),order?._id)}} className="btn btn-xs btn-primary "><FaAngleUp /> Return Accessories</button>
                                        </div>
                                    }
                                </th>
                                <th>
                                    {
                                    order.recieptStatus ?<span className="badge badge-warning ">Yes</span> :<button onClick={()=>handleReciept(order._id)} className="btn btn-xs btn-primary"><FaArrowsRotate /> Reciept</button>
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