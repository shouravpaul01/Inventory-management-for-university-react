import { FaAngleUp, FaPrint } from "react-icons/fa6";
import getReturnAccessories from "../../utils/getReturnAccessories";


const ReturnedAccessoriesTable = ({orders,setModalId,handleShowReturnedAccessoris}) => {
    return (
        <div className="overflow-x-auto my-3">
        <table className="table bg-white border-b border-violet-300">
            {/* head */}
            <thead className="bg-green-200 ">
                <tr className="text-base ">

                    <th> </th>
                    <th>InvoiceID</th>
                    <th>Return</th>
                    <th>Reciept All</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders?.map((order, index) => <tr key={index}>
                        <th>
                            {index+1}
                        </th>
                        <td>
                            {order?.invoiceId}
                        </td>
                        <th>
                            {

                                <div className="indicator">
                                    <span className="indicator-item badge badge-secondary">{getReturnAccessories(order?.accessories).length}</span>
                                    <button onClick={() =>{ setModalId(order?._id),handleShowReturnedAccessoris(order?._id)}} className="btn btn-xs btn-primary "><FaAngleUp /> Return Accessories</button>
                                </div>
                            }
                        </th>
                        <td>  
                            {/* <button onClick={() => handleStatus(order?._id, order?.approveStatus ? false : true)} className={`btn btn-xs uppercase ${order?.approveStatus ? 'btn-primary' : 'btn-error'}`}><FaArrowRightArrowLeft /> {order?.approveStatus ? "Approve" : "Pending"}</button> */}
                            </td>
                        <td><span className={`badge ${order.recieptStatus?.user?'badge-success':'badge-error'}`}>{order.recieptStatus?.user? 'Yes':'No'}</span>
                        </td>
                        <td>  <button className={`btn btn-xs uppercase btn-primary `} disabled={order?.approveStatus?false:true}><FaPrint /> Print</button></td>
                    </tr>
                    )
                }

            </tbody>


        </table>
    </div>
    );
};

export default ReturnedAccessoriesTable;