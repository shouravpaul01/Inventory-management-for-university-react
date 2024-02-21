import getReturnAccessories from "../../utils/getReturnAccessories";

const MyOrderTable = ({myOrders,handleShowReturnAccessoris,handleShowAllAccessoris,setModalId}) => {
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
                                    {index++}
                                </th>
                                <td>
                                    {order?.invoiceId}
                                </td>
                                <td>
                                    <div className="indicator">
                                        <span className="indicator-item badge badge-secondary">{order.accessories?.length}</span>
                                        <button onClick={()=>{setModalId(order?._id),handleShowAllAccessoris(order?.accessories)}} className="btn btn-xs btn-primary ">Accessoris</button>
                                    </div>
                                </td>
                                <td><span className={`badge  ${order?.approveStatus == "false" ? 'badge-error' : 'badge-warning'}`}>{order?.approveStatus == "false" ? "Pending" : "Approve"}</span> </td>
                                <th>
                                    {

                                        <div className="indicator">
                                            <span className="indicator-item badge badge-secondary">{getReturnAccessories(order?.accessories).length}</span>
                                            <button onClick={() =>{setModalId(order?._id), handleShowReturnAccessoris(getReturnAccessories(order?.accessories),order?._id)}} className="btn btn-xs btn-primary ">Return Accessories</button>
                                        </div>
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