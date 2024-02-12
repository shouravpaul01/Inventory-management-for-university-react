import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import useSelectedAccessories from "../../hooks/useSelectedAccessories";


const CardAccessories = ({ product}) => {
    const [plusMinusValue, setPlusMinusValue] = useState(1)
    const [selectedTotalAccessories ,setSelectedTotalAccessories]=useSelectedAccessories()
    // console.log(selectedTotalAccessories);
    const handlePlus = (productQuantity) => {
        if (plusMinusValue==productQuantity) {
            return
        }
        setPlusMinusValue(currentValue => currentValue + 1)
    }
    const handleMinus = () => {
        if (plusMinusValue==1) {
            return
        }
        setPlusMinusValue(currentValue => currentValue - 1)
    }
    console.log(selectedTotalAccessories,'2')
    const handleSelectAccessorie = (accessorie) => {
        console.log(selectedTotalAccessories,'3')
        const findAccessorie=selectedTotalAccessories?.find(item=>item._id==accessorie._id)
        if (findAccessorie) {
            return
        }
        
        const data={_id:accessorie?._id,name:accessorie?.name,image:accessorie?.image?.url,returnStatus:accessorie?.returnStatus}
        data.quantity=plusMinusValue
    //    console.log(data);
       setSelectedTotalAccessories([...selectedTotalAccessories,data])
       
    }
    return (
        <div className="card h-52 bg-base-100 shadow-xl  relative">

            <figure className="h-24 border"><img src={product?.image?.url} className=" object-cover" alt="accessories" /></figure>
            <div className="badge badge-secondary absolute -top-2 right-0">{product?.quantity}</div>
            <div className="card-body p-2 relative">

                <h2 className="truncate justify-center">
                    {product?.name}

                </h2>

                <div className="card-actions justify-center absolute bottom-0 left-0 right-0">
                    <div className="flex items-center  gap-1">
                        <button onClick={() => handleMinus()} className="btn btn-xs btn-circle  btn-primary"><FaMinus /></button>
                        <input type="text" value={plusMinusValue} readOnly className="w-10 border border-violet-600 rounded-md focus:outline-none text-center" />
                        <button onClick={() => handlePlus(product?.quantity)} className="btn btn-xs btn-circle btn-outline btn-primary"><FaPlus /></button>
                    </div>
                    <button onClick={()=>handleSelectAccessorie(product)} className="btn btn-sm btn-primary w-full rounded-t-none rounded-b-2xl">Add</button>
                </div>
            </div>
        </div>
    );
};

export default CardAccessories;