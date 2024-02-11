import { FaMinus, FaPlus } from "react-icons/fa6";


const CardAccessories = ({ product }) => {
    return (
        <div className="card h-52 bg-base-100 shadow-xl ">
            <figure className="h-24 border"><img src={product?.image?.url} className=" object-cover" alt="accessories" /></figure>
            <div className="card-body p-2 relative">
                <h2 className="truncate justify-center">
                    {product?.name}

                </h2>

                <div className="card-actions justify-center absolute bottom-0 left-0 right-0">
                    <div className="flex items-center  gap-1">
                        <button className="btn btn-xs btn-circle  btn-primary"><FaPlus /></button>
                        <input type="text" name="" className="w-10 border border-violet-600 rounded-md focus:outline-none" />
                        <button className="btn btn-xs btn-circle btn-outline btn-primary"><FaMinus /></button>
                    </div>
                    <button className="btn btn-sm btn-primary w-full rounded-t-none rounded-b-2xl">Add</button>
                </div>
            </div>
        </div>
    );
};

export default CardAccessories;