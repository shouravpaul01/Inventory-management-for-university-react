import {  useState } from 'react';
import InputPlusMinus from '../sharedComponents/InputPlusMinus';


const TableBodyConfirmAccessorie = ({ index,accessorie,handleCheckBoxInput }) => {
    const [plusMinusValue, setPlusMinusValue] = useState(accessorie?.orderQuantity)
    
    return (
        <tr >
            <th>
                <label>
                    <input type="checkbox" id={`checkbox${index}`} checked={accessorie?.isChecked} value={JSON.stringify({_id: accessorie?._id,name:accessorie?.name, orderQuantity: plusMinusValue})} onChange={(e) => handleCheckBoxInput(e.target.value,accessorie?._id,`checkbox${index}`)} className="checkbox" />
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