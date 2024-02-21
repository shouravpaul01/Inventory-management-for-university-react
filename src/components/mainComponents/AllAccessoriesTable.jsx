import React from 'react';

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
                <th>OrderQty</th>
                <th>ReturnStatus</th>
                <th>Deadline</th>
            </tr>
        </thead>
        <tbody>
            {
                allAccessories?.map((accessorie, index) => <tr key={index}>
                    <th>
                    {index+1}
                    </th>
                    <td>
                        {accessorie?.name}
                    </td>
                    <td>
                        {accessorie?.orderQuantity}
                    </td>
                    <td>{accessorie?.returnStatus}</td>
                    <td>{accessorie?.deadline}</td>

                </tr>)
            }


        </tbody>
    </table>
</div>
    );
};

export default AllAccessoriesTable;