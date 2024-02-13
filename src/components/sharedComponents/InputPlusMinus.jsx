import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";


const InputPlusMinus = ({quantity,plusMinusValue, setPlusMinusValue}) => {
  
    const handlePlus = (productQuantity) => {
        if (plusMinusValue == productQuantity) {
            return
        }
        setPlusMinusValue(currentValue => currentValue + 1)
    }
    const handleMinus = () => {
        if (plusMinusValue == 1) {
            return
        }
        setPlusMinusValue(currentValue => currentValue - 1)
    }
    return (
        <div className="flex items-center  gap-1">
        <button onClick={() => handleMinus()} className="btn btn-xs btn-circle  btn-primary"><FaMinus /></button>
        <input type="text" value={plusMinusValue} readOnly className="w-10 border border-violet-600 rounded-md focus:outline-none text-center" />
        <button onClick={() => handlePlus(quantity)} className="btn btn-xs btn-circle btn-outline btn-primary"><FaPlus /></button>
    </div>
    );
};

export default InputPlusMinus;