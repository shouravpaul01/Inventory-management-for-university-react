import { useEffect, useState } from "react";
import useSelectedAccessories from "../../../hooks/useSelectedAccessories"
import { FaArrowRight, FaCircleInfo } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../../../axios.config";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TableBodyConfirmAccessory from "../../../components/mainComponents/TableBodyConfirmAccessory";
import useCheckPermission from "../../../hooks/useCheckPermission";



const ConfirmAccessoriesPage = () => {
    const { selectedTotalAccessories, setSelectedTotalAccessories } = useSelectedAccessories()
    const [checkedAll, setCheckedAll] = useState(true)
    const [checkedInput, setCheckedInput] = useState([])
    const { register, handleSubmit, watch, setValue, formState: { errors }, } = useForm();
    const { user } = useAuth()
    const navigate = useNavigate()

    //Permission
    const checkConfirmAccessoriesPermission = useCheckPermission(['All', 'Confirm accessories'])
    const checkConfirmDistributionPermission = useCheckPermission(['All', 'Confirm distribution'])
    useEffect(() => {
        const accessoriesIdArray = selectedTotalAccessories.map(accessorie => accessorie._id)
        if (checkedInput.length == 0) {
            return setCheckedAll(false)
        } else if (checkedAll && selectedTotalAccessories.length == checkedInput.length) {
            handleGetDataCheckedAll()
            return
        } else if (accessoriesIdArray.length == checkedInput.length) {
            console.log(accessoriesIdArray.length, checkedInput.length, '1');
            setCheckedAll(true)
        } else {
            console.log('33');
            setCheckedAll(false)
        }


    }, [checkedInput])
    const handleCheckedAll = () => {
        if (checkedAll) {
            setCheckedAll(!checkedAll);
            setCheckedInput([]);
        } else if (!checkedAll) {
            const accessoriesIdArray = selectedTotalAccessories.map(accessorie => accessorie._id)
            setCheckedAll(!checkedAll);
            setCheckedInput(accessoriesIdArray);

        }

    };
    const handleGetDataCheckedAll = () => {
        const checkedAllData = checkedInput.map(accessoriesId => {
            const checkboxValue = document.getElementById(accessoriesId).value;
            return checkboxValue
        })
        setValue('accessories', checkedAllData)

    }


    const handleCheckbox = (value) => {
        const _id = JSON.parse(value)._id
        console.log(_id);
        checkedInput.includes(_id.toString()) ? setCheckedInput(checkedInput.filter(element => element !== _id)) : setCheckedInput(prev => [...prev, _id])

    }

    const handleDelete = (accessoriesId) => {
        if (checkedInput.includes(accessoriesId)) {
            console.log('accessoriesId');
            const filterCheckInput = checkedInput.filter(item => item !== accessoriesId)
            setCheckedInput(filterCheckInput)
        }
        //Find data from total selected total accessorie
        const filterSelectedTotalAccessories = selectedTotalAccessories.filter(item => item._id !== accessoriesId)
        setSelectedTotalAccessories(filterSelectedTotalAccessories)

    }

    const handleConfirmAccessories = (data) => {
        if (data.accessories.length == 0) {
            return
        }
        //These data need to be converted from stringified to parsed format.
        const accessories = data?.accessories?.map(accessorie => JSON.parse(accessorie))

        const newOrderAccessories = { userEmail: user?.email, accessories: accessories }
        axiosInstance.post('/order', newOrderAccessories).then(res => {
            console.log(res);
            if (res.data.code == 200) {
                toast.success(res.data.message)
                navigate('/my-order')
                setSelectedTotalAccessories([])
            }
        })
    }
    const handleProcessedDistributionAccessories = (data) => {
        console.log(data, 'dkdk');
        const formData = data.accessories.map(accessory => JSON.parse(accessory))
        navigate('/confirm-distribute-accessories', { state: { accessories: formData } })
    }
    console.log(selectedTotalAccessories);
    return (
        <form className="my-container py-16">
            <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {
                        selectedTotalAccessories?.length == 0 && <caption className=" caption-bottom">
                            <div className='flex gap-2 items-center justify-center text-lg py-2'>
                                <FaCircleInfo />
                                <span className=''>Please select accessories.</span>
                                <Link to={'/'} className="ms-10 border-b border-blue-600 text-blue-600">Accessories</Link>
                            </div>
                        </caption>
                    }
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">
                            <th >
                                {
                                    selectedTotalAccessories.length>0 && <label>
                                    <input type="checkbox" checked={checkedAll} onChange={handleCheckedAll} className={`checkbox checkbox-sm checkbox-primary `} />
                                </label>
                                }
                                
                            </th>
                            <th>Name</th>
                            <th>Returnable</th>
                            <th>Order Quantity</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedTotalAccessories?.map((accessory, index) => <TableBodyConfirmAccessory key={index} register={register} checkedInput={checkedInput} accessory={accessory} handleCheckbox={handleCheckbox} handleDelete={handleDelete} />
                            )
                        }

                    </tbody>
                </table>
            </div>
            {
                selectedTotalAccessories.length>0 && <div className="text-end pt-5">
                    {
                        checkConfirmAccessoriesPermission && <button type="button" onClick={handleSubmit(handleConfirmAccessories)} className="btn btn-sm btn-primary rounded-full font-bold me-3" disabled={checkedInput?.length == 0}><FaArrowRight />  Confirm Accessories</button>
                    }
                    {
                        checkConfirmDistributionPermission && <button type="button" onClick={handleSubmit(handleProcessedDistributionAccessories)} className="btn btn-sm btn-primary rounded-full font-bold me-3" disabled={checkedInput?.length == 0}><FaArrowRight />  Processed Distribution</button>
                    }
                </div>
            }
        </form>
    );
};

export default ConfirmAccessoriesPage;