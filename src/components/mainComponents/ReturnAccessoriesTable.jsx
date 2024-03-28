import moment from "moment/moment";
import { useEffect, useState } from "react";
import { FaArrowRight, FaCircleCheck } from "react-icons/fa6";
import axiosInstance from "../../../axios.config";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


const ReturnAccessoriesTable = ({ orderId, returnAccessories, setReturnAccessories, handleCloseModal }) => {
    const [checkedAll, setCheckedAll] = useState(true)
    const [checkedInput, setCheckedInput] = useState([])
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    useEffect(() => {
        const accessoriesIdArray = returnAccessories?.accessories?.filter(accessorie => accessorie.returned.status !== true).map(accessorie => accessorie._id)
        if (checkedAll) {
            setValue('accessoriesId', accessoriesIdArray)
            setCheckedInput(accessoriesIdArray)

        }


    }, [checkedAll]);

    useEffect(() => {
        const accessoriesIdArray = returnAccessories?.accessories?.filter(accessorie => accessorie.returned.status !== true).map(accessorie => accessorie._id)
        if (checkedInput.length==0) {
            return setCheckedAll(false)
        }
        if (accessoriesIdArray.length == checkedInput.length) {
            console.log(accessoriesIdArray.length, checkedInput.length, '1');
            setCheckedAll(true)
        } else {
            console.log('33');
            setCheckedAll(false)
        }
    }, [checkedInput])

    const handleCheckedAll = () => {
        setCheckedAll(!checkedAll);
        setCheckedInput([]);
    };
    
    const handleCheckbox = (value) => {
        checkedInput.includes(value.toString()) ? setCheckedInput(checkedInput.filter(element => element !== value)) : setCheckedInput(prev => [...prev, value])

    }


    const handleReturnedAccessories = (data) => {
        console.log(data);
        axiosInstance.patch(`/order/update-accessories-returned-status?orderId=${returnAccessories?.orderId}&accessoriesId=${data.accessoriesId}`)
            .then(res => {
                if (res.data.code == 200) {
                    toast.success(res.data.message)
                    setReturnAccessories({ accessories: res.data.data, orderId: returnAccessories?.orderId })
                    const filter=checkedInput.filter(checkedInputId=>!data.accessoriesId.includes(checkedInputId))
                    setCheckedInput(filter)

                }
            })
    }
    console.log(returnAccessories,checkedInput);
    return (
        <form onSubmit={handleSubmit(handleReturnedAccessories)}>
            <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">
                            <th>
                                {
                                    <label>
                                        {
                                         checkedInput.length>0 && <input type="checkbox" checked={checkedAll} onChange={handleCheckedAll} className="checkbox checkbox-sm checkbox-primary" />
                                        }
                                    </label>
                                }
                            </th>
                            <th>Name</th>
                            <th>OrderQty</th>
                            <th>Code</th>
                            <th>Order Date</th>
                            <th>Deadline</th>
                            <th>Returned Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            returnAccessories?.accessories?.map((accessorie, index) => <tr key={index}>
                                <th>
                                    {
                                        <label>
                                            <input type="checkbox" {...register('accessoriesId')} value={accessorie?._id} onChange={(e) => handleCheckbox(e.target.value)} checked={checkedInput?.includes(accessorie?._id?.toString())} disabled={accessorie.returned.status} className="checkbox checkbox-sm checkbox-primary disabled" />
                                        </label>
                                    }
                                </th>
                                <td>
                                    {accessorie?.name}
                                </td>
                                <td>
                                    {accessorie?.quantity}
                                </td>
                                <td className="w-40">
                                    <div className="flex flex-wrap gap-1">
                                    {accessorie?.allCode.map((code,index)=><span key={index} className="badge badge-success ">{code}</span>)}
                                    </div>
                                </td>
                                <td>
                                    {moment(returnAccessories?.orderDate).format('LL')}
                                </td>
                                <td>{accessorie?.deadline?moment(accessorie?.deadline).format('LL'):<span className="badge badge-success">No</span>}</td>
                                <td>{accessorie?.returned?.date ? <span className="flex items-center gap-1">{moment(accessorie?.returned?.date).format('LL')} <FaCircleCheck className="text-success" /> </span> : 'No'}</td>

                            </tr>)
                        }


                    </tbody>
                </table>

            </div>
            <div className="text-end py-2">
                <button type="submit" className="btn btn-sm btn-primary rounded-full " disabled={checkedInput.length == 0}><FaArrowRight /> Returned</button>
            </div>
        </form>
    );
};

export default ReturnAccessoriesTable;