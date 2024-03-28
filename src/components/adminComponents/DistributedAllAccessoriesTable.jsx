import moment from 'moment';
import React from 'react';

const DistributedAllAccessoriesTable = ({allAccessories}) => {
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
                <th>Accessoies Code</th>
               
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
                        <span className={`badge badge-success`}>{accessory?.isItReturnable}</span>
                    </td>
                    <td>
                        {
                            accessory.allCode.map((code,index)=><span key={index} className='badge badge-success me-1'>{code}</span>)
                        }
                    </td>
                    

                </tr>)
            }


        </tbody>
    </table>
</div>
    );
};

export default DistributedAllAccessoriesTable;