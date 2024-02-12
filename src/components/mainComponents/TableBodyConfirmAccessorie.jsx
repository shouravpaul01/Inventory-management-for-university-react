import React, { useState } from 'react';
import InputPlusMinus from '../sharedComponents/InputPlusMinus';

const TableBodyConfirmAccessorie = ({ accessorie }) => {
    const [plusMinusValue, setPlusMinusValue] = useState(accessorie?.orderQuantity)
    const [selectedCheckboxValue, setSelectedCheckboxValue] = useState([])
    
    const handleCheckBoxInput = (data) => {
        console.log(data);
        // const filterValue = selectedCheckboxValue?.filter(item => item._id !== value._id)
        // console.log(filterValue,value._id);
        // if (filterValue.length>=1) {
        //     setSelectedCheckboxValue(filterValue)
        //     return
        // }

        setSelectedCheckboxValue([...selectedCheckboxValue,data])
    }
    console.log(selectedCheckboxValue);
    return (
        <tr >
            <th>
                <label>
                    <input type="checkbox" onChange={() => handleCheckBoxInput({ _id: accessorie?._id, orderQuantity: plusMinusValue })} className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={accessorie?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{accessorie?.name}</div>
                        <div className="badge badge-secondary">{accessorie?.totalQuantity}</div>
                    </div>
                </div>
            </td>
            <td>
                {accessorie?.returnStatus}
            </td>

            <td>
                <InputPlusMinus quantity={accessorie?.totalQuantity} plusMinusValue={plusMinusValue} setPlusMinusValue={setPlusMinusValue} />

            </td>
        </tr>

    );
};

export default TableBodyConfirmAccessorie;