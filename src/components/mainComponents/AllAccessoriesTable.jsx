import moment from 'moment';

const AllAccessoriesTable = ({allAccessories}) => {
    console.log(allAccessories);
    return (
        <div className="overflow-x-auto">
        <table className="table border-b border-violet-300">
            {/* head */}
            <thead className="bg-violet-200 ">
                <tr className="text-base ">
                <th>
                   
                </th>
                <th>Name</th>
                <th>OrderQty</th>
                <th>Returnable</th>
                <th>Order Date</th>
                <th>Deadline</th>
            </tr>
        </thead>
        <tbody>
            {
                allAccessories.accessories?.map((accessorie, index) => <tr key={index}>
                    <th>
                    {index+1}
                    </th>
                    <td>
                        {accessorie?.name}
                    </td>
                    <td>
                        {accessorie?.orderQuantity}
                    </td>
                    <td>
                        <span className={`badge ${accessorie?.isItReturnable=='Yes'?'badge-success':'badge-error'}`}>{accessorie?.isItReturnable}</span>
                    </td>
                    <td>
                        {moment(allAccessories?.orderDate).format('LL')}
                    </td>
                    <td>{accessorie?.deadline?moment(accessorie?.deadline).format('LL'):'No'}</td>

                </tr>)
            }


        </tbody>
    </table>
</div>
    );
};

export default AllAccessoriesTable;