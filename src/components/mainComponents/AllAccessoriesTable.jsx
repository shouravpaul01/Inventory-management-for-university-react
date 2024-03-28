import moment from 'moment';

const AllAccessoriesTable = ({allAccessories}) => {

    return (
        <div className="overflow-x-auto">
        <table className="table border-b border-violet-300">
            {/* head */}
            <thead className="bg-violet-200 ">
                <tr className="text-base ">
                <th>
                   
                </th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Returnable</th>
                <th>Order Date</th>
                <th>Deadline</th>
            </tr>
        </thead>
        <tbody>
            {
                allAccessories.accessories?.map((accessory, index) => <tr key={index}>
                    <th>
                    {index+1}
                    </th>
                    <td>
                        {accessory?.name}
                    </td>
                    <td>
                        {accessory?.quantity}
                    </td>
                    <td>
                        <span className={`badge ${accessory?.isItReturnable=='Yes'?'badge-success':'badge-error'}`}>{accessory?.isItReturnable}</span>
                    </td>
                    <td>
                        {moment(allAccessories?.orderDate).format('LL')}
                    </td>
                    <td>{accessory?.deadline?moment(accessory?.deadline).format('LL'):'No'}</td>

                </tr>)
            }


        </tbody>
    </table>
</div>
    );
};

export default AllAccessoriesTable;