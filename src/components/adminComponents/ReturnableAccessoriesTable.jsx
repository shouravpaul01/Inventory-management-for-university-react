import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaArrowsRotate, FaCheck, FaCheckDouble, FaCircleCheck } from "react-icons/fa6";
import axiosInstance from "../../../axios.config";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const ReturnableAccessoriesTable = ({ returnedAccessories, setReturnedAccessories }) => {
    const [checkedAll, setCheckedAll] = useState(true)
    const [checkedInput, setCheckedInput] = useState([])
    const { user } = useAuth()
    const { register, handleSubmit, reset, setValue, setError, formState: { errors }, } = useForm();
    useEffect(() => {
        const accessoriesIdArray = returnedAccessories?.accessories?.filter(accessorie =>( accessorie.returned?.date && !accessorie.returned?.recievedReturned.date) ).map(accessorie => accessorie._id)

        if (checkedAll) {
            setValue('accessoriesId', accessoriesIdArray)
            setCheckedInput(accessoriesIdArray)

        }


    }, [checkedAll]);
    console.log(checkedInput, 'checkedInput');
    useEffect(() => {
        const accessoriesIdArray = returnedAccessories?.accessories?.filter(accessorie =>( accessorie.returned?.date && !accessorie.returned?.recievedReturned.date) ).map(accessorie => accessorie._id)
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
    const handleCheckbox = (value) => {

        checkedInput.includes(value.toString()) ? setCheckedInput(checkedInput.filter(element => element !== value)) : setCheckedInput(prev => [...prev, value])
        const accessoriesIdArray = returnedAccessories?.accessories?.map(accessorie => accessorie._id)
        console.log(accessoriesIdArray.length, checkedInput.length,);


    }
    console.log(returnedAccessories, 'returnedAccessories');
    const handleReturnedRecievedAll = (data) => {
        data.email = user.email
        data.orderId = returnedAccessories?.orderId
        console.log(data, 'data');
        axiosInstance.patch(`/order/update-recieved-accessories-date`, data).then(res => {
            console.log(res);
            if (res.status == 200) {
                setReturnedAccessories({ accessories: res.data.data, orderId: returnedAccessories?.orderId })
                toast.success(res.data.message)
            }

        })
    }
    return (
        <form onSubmit={handleSubmit(handleReturnedRecievedAll)}>
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
                            <th>Recieved Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            returnedAccessories?.accessories?.map((accessorie, index) => <tr key={index}>
                                <th>
                                    <label>
                                        <input type="checkbox" {...register('accessoriesId')} value={accessorie?._id} onChange={(e) => handleCheckbox(e.target.value)} className="checkbox checkbox-sm checkbox-primary " checked={checkedInput?.includes(accessorie?._id?.toString())} disabled={(accessorie?.returned?.date && accessorie.returned?.recievedReturned.date)} />
                                    </label>
                                </th>
                                <td>
                                    {accessorie?.name}
                                </td>
                                <td>
                                    {accessorie?.orderQuantity}
                                </td>
                                <td>{moment(accessorie?.deadline).format('LL')}</td>
                                <td>{accessorie?.returned?.date ? <span className="flex items-center gap-1">{moment(accessorie?.returned?.date).format('LL')} <FaCircleCheck className="text-success" /> </span> : 'No'}</td>
                                <td>
                                    {
                                        accessorie?.returned?.recievedReturned?.date ? <span className="flex items-center gap-1">{moment(accessorie?.returned?.recievedReturned?.date).format('LL')} <FaCircleCheck className="text-success" /> </span>:<span className="badge badge-error">No</span>
                                    }
                                </td>
                                <td>
                                    {
                                        accessorie?.returned?.recievedReturned?.status ? <span className="badge badge-success"><FaCheckDouble />Recieved </span> : <Link className="btn btn-xs btn-primary" disabled={!accessorie?.returned?.date}><FaCheck />Recieved</Link>
                                    }
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>

            </div>
            <div className="text-end py-2">
                <button type="submit" className="btn btn-sm btn-primary rounded-full "><FaArrowRight /> Recieved All</button>
            </div>
        </form>
    );
};

export default ReturnableAccessoriesTable;