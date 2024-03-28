import {  useState } from 'react';
import InputPlusMinus from '../sharedComponents/InputPlusMinus';
import { FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


const TableBodyConfirmAccessory = ({register, accessory,checkedInput,handleCheckbox,handleDelete }) => {
    const [plusMinusValue, setPlusMinusValue] = useState(accessory?.quantity)
    
    return (
        <tr >
            <th>
                <label>
                    <input type="checkbox" {...register('accessories')} id={`${accessory?._id}`} value={JSON.stringify({_id: accessory?._id,name:accessory?.name,isItReturnable:accessory?.isItReturnable, quantity: plusMinusValue ,code:accessory?.allCode})} onChange={(e)=>handleCheckbox(e.target.value)} checked={checkedInput?.includes(accessory._id.toString())}  className="checkbox checkbox-sm checkbox-primary" />
                </label>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={accessory?.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{accessory?.name}</div>
                        <div className="badge badge-secondary">{accessory?.currentQuantity}</div>
                    </div>
                </div>
            </td>
            <td>
                {accessory?.isItReturnable}
            </td>

            <td>
                <div className={`${checkedInput?.includes(accessory._id.toString()) && 'opacity-10 pointer-events-none'}`}>
                <InputPlusMinus quantity={accessory?.currentQuantity} plusMinusValue={plusMinusValue} setPlusMinusValue={setPlusMinusValue} />
                </div>
                

            </td>
            <td>
                <Link onClick={()=>handleDelete(accessory?._id)} className='btn btn-xs btn-circle btn-error'><FaXmark /></Link>
            </td>
        </tr>

    );
};

export default TableBodyConfirmAccessory;