import { useEffect, useState } from "react";
import useSelectedAccessories from "../../../hooks/useSelectedAccessories"
import TableBodyConfirmAccessorie from "../../../components/mainComponents/TableBodyConfirmAccessorie";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../../../axios.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const ConfirmAccessoriesPage = () => {
    const { selectedTotalAccessories, setSelectedTotalAccessories } = useSelectedAccessories()
    const [selectedAll, setSelectedAll] = useState(true)
    const [selectedOne, setSelectedOne] = useState(true)
    const [selectedCheckboxValue, setSelectedCheckboxValue] = useState([])
    const {user}=useAuth()
    const navigate=useNavigate()
    useEffect(() => {
        if (selectedAll) {
            handleGetAllData()
            console.log('5');
        }
        if (!selectedAll) {
            console.log('6');
            handleGetAllData()
        }
    }, [selectedAll])
    const handleGetAllData = () => {
        let checkboxValues = [];
        if (selectedAll && selectedOne) {
            //when the checkbox is checked  ,then all checkbox will  check and will be getting value of all checkedbox
            const filterAccessorie = selectedTotalAccessories.map(item => item && { ...item, isChecked: true })
            setSelectedTotalAccessories(filterAccessorie)
            console.log('0');
            for (let i = 0; i < selectedTotalAccessories?.length; i++) {
                const checkboxValue = document.getElementById(`checkbox${i}`).value;
                if (checkboxValue) {
                    const valueParse = JSON.parse(checkboxValue)

                    checkboxValues.push(valueParse);
                }
            }
            setSelectedCheckboxValue(checkboxValues)
        }
        if (!selectedAll && selectedOne) {
            console.log('1', selectedAll);
            //when the checkbox is unchecked ,then all checkbox is unchecked
            const filterAccessorie = selectedTotalAccessories.map(item => item && { ...item, isChecked: false })
            setSelectedTotalAccessories(filterAccessorie)
            checkboxValues = []
        }
        
    }
    const handleCheckBoxInput = (value, accessoriesId, id) => {
        //Find data from total selected accessories
        const findAccessorie = selectedTotalAccessories.find(item => item._id == accessoriesId)
        //Find data from total selected Checkbox 
        const findSelectedCheckboxValue = selectedCheckboxValue.find(item => item._id == accessoriesId)

        if (findAccessorie && findSelectedCheckboxValue) {
            //If a checkbox is  unchecked,then will not be gettting the value associated with that checkbox.
            setSelectedAll(false)
            setSelectedOne(false)
            console.log('2');
            const filterAccessorie = selectedTotalAccessories.map(item => item._id == accessoriesId ? { ...item, isChecked: false } : { ...item })
            //Find data from total selected checkbox
            const filterSelectedCheckboxValue = selectedCheckboxValue.filter(item => item._id !== accessoriesId)
            setSelectedTotalAccessories(filterAccessorie)
            setSelectedCheckboxValue(filterSelectedCheckboxValue)
        }
        if (!findSelectedCheckboxValue) {
            console.log('3');
            //If a checkbox is checked,then will be gettting the value associated with that checkbox.
            const checkboxValue = document.getElementById(id).value;
            if (checkboxValue) {
                setSelectedOne(false)
                const valueParse = JSON.parse(checkboxValue)
                const filterAccessorie = selectedTotalAccessories.map(item => item._id == accessoriesId ? { ...item, isChecked: true } : { ...item })
                setSelectedTotalAccessories(filterAccessorie)
                setSelectedCheckboxValue(prevState => [...prevState, valueParse])
            }
        }
    }
    const handleDelete = (accessoriesId) => {
        //Find data from total selected total accessorie
        const filterSelectedTotalAccessories = selectedTotalAccessories.filter(item => item._id !== accessoriesId)
        setSelectedTotalAccessories(filterSelectedTotalAccessories)
    }
    console.log(selectedCheckboxValue);
    const handleConfirmAccessories = (selectedCheckboxValue) => {
        const newOrder={userEmail:user?.email,accessories:selectedCheckboxValue}
        console.log(newOrder);
        axiosInstance.post('/order',newOrder).then(res=>{
            console.log(res);
            if (res.data.code==200) {
                toast.success(res.data.message)
                navigate('/my-order')
                setSelectedTotalAccessories([])
            }
        })
    }
    return (
        <section className="my-container py-16">
            <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">
                            <th >
                                <label>
                                    <input type="checkbox" checked={selectedAll} onChange={() => { setSelectedAll(!selectedAll), setSelectedOne(true) }} className="checkbox checkbox-sm checkbox-primary" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Return Status</th>
                            <th>Order Quantity</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedTotalAccessories?.map((accessorie, index) => <TableBodyConfirmAccessorie key={index} index={index} accessorie={accessorie} handleCheckBoxInput={handleCheckBoxInput} handleDelete={handleDelete} />
                            )
                        }

                    </tbody>
                </table>
            </div>
            <div className="text-end pt-5">
                <button onClick={() => handleConfirmAccessories(selectedCheckboxValue)} className="btn btn-sm btn-primary rounded-full font-bold me-3"><FaArrowRight />  Confirm Accessories</button>
            </div>
        </section>
    );
};

export default ConfirmAccessoriesPage;