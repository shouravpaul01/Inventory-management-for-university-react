import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";


const InputPlusMinus = ({ quantity, plusMinusValue, setPlusMinusValue }) => {

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
            <Link onClick={() => handleMinus()} className="btn btn-xs btn-circle  btn-primary"><FaMinus /></Link>
            <input type="text" value={plusMinusValue} readOnly className="w-10 border border-violet-600 rounded-md focus:outline-none text-center" />
            <Link onClick={() => handlePlus(quantity)} className="btn btn-xs btn-circle btn-outline btn-primary"><FaPlus /></Link>
        </div>
    );
};

export default InputPlusMinus;