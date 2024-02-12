import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import useSelectedAccessories from "../../hooks/useSelectedAccessories";
import InputPlusMinus from "../sharedComponents/InputPlusMinus";


const CardAccessories = ({ accessorie }) => {
    const [plusMinusValue, setPlusMinusValue] = useState(1)
    const { selectedTotalAccessories, setSelectedTotalAccessories } = useSelectedAccessories()
    // console.log(selectedTotalAccessories);
    
    
    const handleSelectAccessorie = (accessorie) => {
        console.log(selectedTotalAccessories, '3')
        const findAccessorie = selectedTotalAccessories?.find(item => item._id == accessorie._id)
        if (findAccessorie) {
            return
        }

        const data = { _id: accessorie?._id, name: accessorie?.name, image: accessorie?.image?.url, returnStatus: accessorie?.returnStatus, totalQuantity: accessorie?.quantity }
        data.orderQuantity = plusMinusValue
        //    console.log(data);
        setSelectedTotalAccessories([...selectedTotalAccessories, data])

    }
    return (
        <div className="card h-52 bg-base-100 shadow-xl  relative">

            <figure className="h-24 border"><img src={accessorie?.image?.url} className=" object-cover" alt="accessories" /></figure>
            <div className="badge badge-secondary absolute -top-2 right-0">{accessorie?.quantity}</div>
            <div className="card-body p-2 relative">

                <h2 className="truncate justify-center">
                    {accessorie?.name}

                </h2>

                <div className="card-actions justify-center absolute bottom-0 left-0 right-0">
                   <InputPlusMinus quantity={accessorie?.quantity} plusMinusValue={plusMinusValue} setPlusMinusValue={setPlusMinusValue} />
                    <button onClick={() => handleSelectAccessorie(accessorie)} className="btn btn-sm btn-primary w-full rounded-t-none rounded-b-2xl">Add</button>
                </div>
            </div>
        </div>
    );
};

export default CardAccessories;