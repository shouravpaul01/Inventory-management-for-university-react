import { useEffect, useState } from "react";
import useSelectedAccessories from "../../../hooks/useSelectedAccessories"
import TableBodyConfirmAccessorie from "../../../components/mainComponents/TableBodyConfirmAccessorie";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../../../axios.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";



const ConfirmAccessoriesPage = () => {
    const { selectedTotalAccessories, setSelectedTotalAccessories } = useSelectedAccessories()
    const [checkedAll, setCheckedAll] = useState(true)
    const [checkedInput, setCheckedInput] = useState([])
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const {user}=useAuth()
    const navigate=useNavigate()
console.log(selectedTotalAccessories);
    useEffect(() => {
        const accessoriesIdArray = selectedTotalAccessories.map(accessorie => accessorie._id)
        if (checkedAll) {
            setValue('accessories', accessoriesIdArray)
            setCheckedInput(accessoriesIdArray)

        }


    }, [checkedAll]);

    useEffect(() => {
        const accessoriesIdArray = selectedTotalAccessories.map(accessorie => accessorie._id)
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
      const _id=JSON.parse(value)._id
        console.log(_id);
        checkedInput.includes(_id.toString()) ? setCheckedInput(checkedInput.filter(element => element !== _id)) : setCheckedInput(prev => [...prev, _id])

    }

    const handleDelete = (accessoriesId) => {
        //Find data from total selected total accessorie
        const filterSelectedTotalAccessories = selectedTotalAccessories.filter(item => item._id !== accessoriesId)
        setSelectedTotalAccessories(filterSelectedTotalAccessories)
    }

    const handleConfirmAccessories = (data) => {
        if (data.accessories.length==0) {
            console.log(data);
            return
        }

        //These data need to be converted from stringified to parsed format.
        const accessories=data.accessories.map(accessorie=>JSON.parse(accessorie))
        const newOrderAccessories={userEmail:user?.email,accessories:accessories}
        axiosInstance.post('/order',newOrderAccessories).then(res=>{
            console.log(res);
            if (res.data.code==200) {
                toast.success(res.data.message)
                navigate('/my-order')
                setSelectedTotalAccessories([])
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(handleConfirmAccessories)} className="my-container py-16">
            <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">
                            <th >
                                <label>
                                    {
                                      checkedInput.length>0 && <input type="checkbox" checked={checkedAll} onChange={handleCheckedAll} className="checkbox checkbox-sm checkbox-primary" />
                                    }
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Returnable</th>
                            <th>Order Quantity</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedTotalAccessories?.map((accessorie, index) => <TableBodyConfirmAccessorie key={index} register={register} checkedInput={checkedInput} accessorie={accessorie}  handleCheckbox={handleCheckbox}  handleDelete={handleDelete} />
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className="text-end pt-5">
                <button type="submit" className="btn btn-sm btn-primary rounded-full font-bold me-3" disabled={checkedInput.length==0}><FaArrowRight />  Confirm Accessories</button>
            </div>
        </form>
    );
};

export default ConfirmAccessoriesPage;