import { FaAngleUp, FaCircleInfo, FaPrint } from "react-icons/fa6";
import { checkReturnedStatus, getDeadlineReturnAccessories } from "../../utils/utils";



const ReturnedAccessoriesTable = ({ orders, setModalId, handleShowReturnedAccessoris }) => {
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
                        <th>Recieved Accessories</th>
                        <th></th>
                        <th>Reciept All</th>
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
                            <th>
                                {

                                    <div className="indicator">
                                        <span className="indicator-item badge badge-secondary">{getDeadlineReturnAccessories(order?.accessories).length}</span>
                                        <button onClick={() => { setModalId(order?._id), handleShowReturnedAccessoris(order?._id) }} className="btn btn-xs btn-primary "  disabled={checkReturnedStatus(order)}><FaAngleUp /> Recieved Accessories</button>
                                    </div>
                                }
                            </th>
                            <td>
                                {/* <button onClick={() => handleStatus(order?._id, order?.approveStatus ? false : true)} className={`btn btn-xs uppercase ${order?.approveStatus ? 'btn-primary' : 'btn-error'}`}><FaArrowRightArrowLeft /> {order?.approveStatus ? "Approve" : "Pending"}</button> */}
                            </td>
                            <td><span className={`badge ${order.recievedOrder?.status ? 'badge-success' : 'badge-error'}`}>{order.recievedOrder?.status ? 'Yes' : 'No'}</span>
                            </td>
                            <td>  <button className={`btn btn-xs uppercase btn-primary `} disabled={checkReturnedStatus(order)}><FaPrint /> Print</button></td>
                        </tr>
                        )
                    }

                </tbody>


            </table>
        </div>
    );
};

export default ReturnedAccessoriesTable;