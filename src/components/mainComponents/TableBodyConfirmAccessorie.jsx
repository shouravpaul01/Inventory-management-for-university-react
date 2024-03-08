import {  useState } from 'react';
import InputPlusMinus from '../sharedComponents/InputPlusMinus';
import { FaXmark } from 'react-icons/fa6';


const TableBodyConfirmAccessorie = ({register, accessorie,checkedInput,handleCheckbox,handleDelete }) => {
    const [plusMinusValue, setPlusMinusValue] = useState(accessorie?.orderQuantity)
    // const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    
    return (
        <tr >
            <th>
                <label>
                    <input type="checkbox" {...register('accessories')}  checked={checkedInput?.includes(accessorie._id.toString())} value={JSON.stringify({_id: accessorie?._id,name:accessorie?.name,isItReturnable:accessorie?.isItReturnable, orderQuantity: plusMinusValue})} onChange={(e)=>handleCheckbox(e.target.value)}  className="checkbox checkbox-sm checkbox-primary" />
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
                {accessorie?.isItReturnable}
            </td>

            <td>
                <InputPlusMinus quantity={accessorie?.totalQuantity} plusMinusValue={plusMinusValue} setPlusMinusValue={setPlusMinusValue} />

            </td>
            <td>
                <button onClick={()=>handleDelete(accessorie?._id)} className='btn btn-xs btn-circle btn-error'><FaXmark /></button>
            </td>
        </tr>

    );
};

export default TableBodyConfirmAccessorie;