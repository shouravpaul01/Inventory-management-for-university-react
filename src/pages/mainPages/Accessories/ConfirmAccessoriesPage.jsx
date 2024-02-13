import { useEffect, useState } from "react";
import useSelectedAccessories from "../../../hooks/useSelectedAccessories";
import { FaMinus, FaPlus } from "react-icons/fa6";
import TableBodyConfirmAccessorie from "../../../components/mainComponents/TableBodyConfirmAccessorie";
import { slowConnection } from "swr/_internal";


const ConfirmAccessoriesPage = () => {
    const { selectedTotalAccessories,setSelectedTotalAccessories } = useSelectedAccessories()
    const [selectedAll, setSelectedAll] = useState(true)
    const [selectedOne, setSelectedOne] = useState(true)
    const [selectedCheckboxValue, setSelectedCheckboxValue] = useState([])
    useEffect(()=>{
        if (selectedAll) {
            handleGetAllData()
        }
        if (!selectedAll) {
            handleGetAllData()
        }
    },[selectedAll])
    const handleGetAllData=()=>{ 
        let checkboxValues = [];  
      if (selectedAll && selectedOne) { 
        //when the checkbox is checked  ,then all checkbox will  check and will be getting value of all checkedbox
        const filterAccessorie=selectedTotalAccessories.map(item=>item && {...item,isChecked: true})
        setSelectedTotalAccessories(filterAccessorie)
        console.log('0');
        for (let i = 0; i < selectedTotalAccessories?.length; i++) { 
          const checkboxValue = document.getElementById(`checkbox${i}`).value;
          if (checkboxValue ) {
            const valueParse=JSON.parse(checkboxValue)
            
            checkboxValues.push(valueParse);
          }
        }
        
      }
      if (!selectedAll && selectedOne) {
        console.log('1',selectedAll);
        //when the checkbox is unchecked ,then all checkbox is unchecked
        const filterAccessorie=selectedTotalAccessories.map(item=>item && {...item,isChecked: false})
        setSelectedTotalAccessories(filterAccessorie)
       checkboxValues=[]
      }
      setSelectedCheckboxValue(checkboxValues)  
    }
    const handleCheckBoxInput = (value,accessoriesId,id) => {
        //Find data from total selected accessories
        const findAccessorie=selectedTotalAccessories.find(item=>item._id==accessoriesId)
         //Find data from total selected Checkbox 
        const findSelectedCheckboxValue=selectedCheckboxValue.find(item=>item._id==accessoriesId) 
         //Find data from total selected checkbox
        const filterSelectedCheckboxValue=selectedCheckboxValue.filter(item=>item._id !==accessoriesId) 
        console.log(findAccessorie,filterSelectedCheckboxValue,findSelectedCheckboxValue);
        if (findAccessorie && findSelectedCheckboxValue) {
            //If a checkbox is  unchecked,then will not be gettting the value associated with that checkbox.
            setSelectedOne(false)
            console.log('2');
            const filterAccessorie=selectedTotalAccessories.map(item=>item._id == accessoriesId ?{...item,isChecked: false}:{...item})
            setSelectedTotalAccessories(filterAccessorie)
            setSelectedCheckboxValue(filterSelectedCheckboxValue)
        }
         if (!findSelectedCheckboxValue) {
           //If a checkbox is checked,then will be gettting the value associated with that checkbox.
            const checkboxValue = document.getElementById(id).value;
          if (checkboxValue ) {
            setSelectedOne(false)
            const valueParse=JSON.parse(checkboxValue)
            const filterAccessorie=selectedTotalAccessories.map(item=>item._id == accessoriesId ?{...item,isChecked: true}:{...item})
            setSelectedTotalAccessories(filterAccessorie)
            setSelectedCheckboxValue(prevState=>[...prevState,valueParse])
          }
         }
     }
     console.log(selectedAll,selectedOne);
console.log(selectedCheckboxValue);
    return (
        <section className="my-container py-16">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-violet-200">
                        <tr className="text-base">
                            <th>
                                <label>
                                <input type="checkbox" checked={selectedAll} onChange={()=>{setSelectedAll(!selectedAll),setSelectedOne(true)}} className="checkbox" />
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
                                selectedTotalAccessories?.map((accessorie, index) => <TableBodyConfirmAccessorie key={index} index={index} accessorie={accessorie} handleCheckBoxInput={handleCheckBoxInput} />
                                ) 
                            }
  
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ConfirmAccessoriesPage;