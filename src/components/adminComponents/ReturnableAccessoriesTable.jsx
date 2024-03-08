import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaArrowsRotate, FaCircleCheck } from "react-icons/fa6";


const ReturnableAccessoriesTable = ({ returnedAccessories }) => {
    const [checkedAll, setCheckedAll] = useState(true)
    const [checkedInput, setCheckedInput] = useState([])
    const { register, handleSubmit, reset, setValue, setError, formState: { errors }, } = useForm();
    useEffect(() => {
        const accessoriesIdArray = returnedAccessories.map(accessorie => accessorie._id)
        if (checkedAll) {

            setCheckedInput(accessoriesIdArray)

        }


    }, [checkedAll]);
    useEffect(() => {
        const accessoriesIdArray = returnedAccessories.map(accessorie => accessorie._id)
        if (accessoriesIdArray.length == checkedInput.length) {
            console.log(accessoriesIdArray.length, checkedInput.length, '1');
            setCheckedAll(true)
        } else {
            setCheckedAll(false)
        }
    }, [checkedInput])
    const handleCheckedAll = () => {
        console.log('ss');
        setCheckedAll(!checkedAll);
        setCheckedInput([]);
    };
    const handleCheckbox =(value) => {

        checkedInput.includes(value.toString()) ? setCheckedInput(checkedInput.filter(element => element !== value)) : setCheckedInput(prev => [...prev, value])
        const accessoriesIdArray = returnedAccessories.map(accessorie => accessorie._id)
        console.log(accessoriesIdArray.length, checkedInput.length,);


    }
    console.log(checkedInput, checkedAll);
    const handleReturnedRecieptAll = (data) => {

        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(handleReturnedRecieptAll)}>
            <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">
                            <th>
                                <input type="checkbox" checked={checkedAll} onChange={handleCheckedAll} className="checkbox checkbox-sm checkbox-primary " />
                            </th>
                            <th>Name</th>
                            <th>OrderQty</th>
                            <th>Deadline</th>
                            <th>Returned Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            returnedAccessories?.map((accessorie, index) => <tr key={index}>
                                <th>
                                    <label>
                                        <input type="checkbox" {...register('input')} value={accessorie?._id} onChange={(e) => handleCheckbox(e.target.value)} className="checkbox checkbox-sm checkbox-primary disabled" checked={checkedInput?.includes(accessorie?._id?.toString())} disabled={accessorie?.returned?.reciept?.status} />
                                    </label>
                                </th>
                                <td>
                                    {accessorie?.name}
                                </td>
                                <td>
                                    {accessorie?.orderQuantity}
                                </td>
                                <td>{moment(accessorie?.deadline).format('LL')}</td>
                                <td>{accessorie?.returned ? <span className="flex items-center gap-1">{moment(accessorie?.returned?.date).format('LL')} <FaCircleCheck className="text-success" /> </span> : 'No'}</td>
                                {/* <td><input type="button" value={'ss'} onChange={(e) => handleReturnedReciept(e.target.value)} className="btn btn-xs btn-primary" disabled={!accessorie?.returned }><FaArrowsRotate /> Reciept</input></td> */}
                            </tr>)
                        }


                    </tbody>
                </table>

            </div>
            <div className="text-end py-2">
                <button onClick={() => { handleReturnedRecieptAll() }} className="btn btn-sm btn-primary rounded-full "><FaArrowRight /> Reciept All</button>
            </div>
        </form>
    );
};

export default ReturnableAccessoriesTable;