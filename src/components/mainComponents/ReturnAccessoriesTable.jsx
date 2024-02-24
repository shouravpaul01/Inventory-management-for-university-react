import moment from "moment/moment";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import axiosInstance from "../../../axios.config";
import { toast } from "react-toastify";


const ReturnAccessoriesTable = ({ orderId, returnAccessories, setReturnAccessories, myOrderMutate }) => {
    const [selectedAll, setSelectedAll] = useState(true)
    const [selectedOne, setSelectedOne] = useState(true)
    console.log(returnAccessories, 'ff');
    const [selectedCheckboxValue, setSelectedCheckboxValue] = useState([])
    useEffect(() => {

        if (selectedAll) {
            // const data=returnAccessories?.map(accessorie=>accessorie.isChecked=true)
            // setReturnAccessories(data)
            handleGetAllData()
            console.log('5');
        }
        if (!selectedAll) {
            console.log('6');
            handleGetAllData()
        }
        if (selectedCheckboxValue?.length==returnAccessories?.length) {
            setSelectedAll(true)
            
        }
    }, [selectedAll,selectedCheckboxValue])

    const handleGetAllData = () => {
        let checkboxValues = [];
        if (selectedAll && selectedOne) {
            //when the checkbox is checked  ,then all checkbox will  check and will be getting value of all checkedbox
            const filterAccessorie = returnAccessories?.map(item => item && { ...item, isChecked: true })
            setReturnAccessories({ accessories: filterAccessorie, orderId: orderId })
            console.log('0');
            for (let i = 0; i < returnAccessories?.length; i++) {
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
            const filterAccessorie = returnAccessories?.map(item => item && { ...item, isChecked: false })
            setReturnAccessories({ accessories: filterAccessorie, orderId: orderId })
            checkboxValues = []
        }

    }
    const handleCheckBoxInput = (value, accessoriesId, id) => {
        //Find data from total selected accessories
        const findAccessorie = returnAccessories.find(item => item._id == accessoriesId)
        //Find data from total selected Checkbox 
        const findSelectedCheckboxValue = selectedCheckboxValue.find(item => item._id == accessoriesId)

        if (findAccessorie && findSelectedCheckboxValue) {
            //If a checkbox is  unchecked,then will not be gettting the value associated with that checkbox.
            setSelectedAll(false)
            setSelectedOne(false)
            console.log('2');
            const filterAccessorie = returnAccessories?.map(item => item._id == accessoriesId ? { ...item, isChecked: false } : { ...item })
            //Find data from total selected checkbox
            const filterSelectedCheckboxValue = selectedCheckboxValue.filter(item => item._id !== accessoriesId)
            setReturnAccessories({ accessories: filterAccessorie, orderId: orderId })
            setSelectedCheckboxValue(filterSelectedCheckboxValue)
        }
        if (!findSelectedCheckboxValue) {
            console.log('3');
            //If a checkbox is checked,then will be gettting the value associated with that checkbox.
            const checkboxValue = document.getElementById(id).value;
            if (checkboxValue) {
                setSelectedOne(false)
                const valueParse = JSON.parse(checkboxValue)
                const filterAccessorie = returnAccessories?.map(item => item._id == accessoriesId ? { ...item, isChecked: true } : { ...item })
                setReturnAccessories({ accessories: filterAccessorie, orderId: orderId })
                setSelectedCheckboxValue(prevState => [...prevState, valueParse])
            }
        }
    }
    const handleReturnedAccessories = (accessories, orderId) => {
        console.log(accessories);
        const accessoriesId = accessories.map(accessorie => accessorie && accessorie._id)
        axiosInstance.patch(`/order/accessories-returned?orderId=${orderId}&accessoriesId=${accessoriesId}`)
            .then(res => {
                if (res.data.code == 200) {
                    myOrderMutate()
                    const filterData=res.data.data.accessories?.filter(accessorie=>accessorie.isItReturnable=='Yes')
                    const accessoriesChecked=filterData.map(accessorie=>accessorie && { ...accessorie, isChecked: true })
       
                    setReturnAccessories({accessories:accessoriesChecked,orderId:orderId})
                    toast.success(res.data.message)
                }
            })
    }
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table border-b border-violet-300">
                    {/* head */}
                    <thead className="bg-violet-200 ">
                        <tr className="text-base ">
                            <th>
                                {
                                  selectedCheckboxValue.length>0 &&  <label>
                                    <input type="checkbox" checked={selectedAll } onChange={() => { setSelectedAll(!selectedAll), setSelectedOne(true) }} className="checkbox checkbox-sm checkbox-primary" />
                                </label>
                                }
                            </th>
                            <th>Name</th>
                            <th>OrderQty</th>
                            <th>Deadline</th>
                            <th>Returned Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            returnAccessories?.map((accessorie, index) => <tr key={index}>
                                <th>
                                    {
                                        <label>
                                            <input type="checkbox" id={`checkbox${index}`} value={accessorie?.returned?'':JSON.stringify({ _id: accessorie?._id, name: accessorie?.name, isItReturnable: accessorie?.isItReturnable, orderQuantity: accessorie?.orderQuantity, deadline: accessorie?.deadline })} onChange={(e) => handleCheckBoxInput(e.target.value, accessorie?._id, `checkbox${index}`)} checked={accessorie?.isChecked && !accessorie?.returned} disabled={accessorie?.isChecked && accessorie?.returned} className="checkbox checkbox-sm checkbox-primary disabled" />
                                        </label>
                                    }
                                </th>
                                <td>
                                    {accessorie?.name}
                                </td>
                                <td>
                                    {accessorie?.orderQuantity}
                                </td>
                                <td>{moment(accessorie?.deadline).format('LL')}</td>
                                <td>{moment(accessorie?.returned?.date).format('LL')}</td>

                            </tr>)
                        }


                    </tbody>
                </table>

            </div>
            <div className="text-end py-2">
                <button onClick={() => handleReturnedAccessories(selectedCheckboxValue, orderId)} className="btn btn-sm btn-primary rounded-full "><FaArrowRight /> Returned</button>
            </div>
        </>
    );
};

export default ReturnAccessoriesTable;