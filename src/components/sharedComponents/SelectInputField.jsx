import { key } from "localforage";
import { useForm } from "react-hook-form";


const SelectInputField = ({placeholder,name}) => {
    const { register } = useForm();

    const options=[
        {_id:1,value:'hi'},
        {_id:2,value:'hello'}
    ]
    return (
        <select {...register(name)} className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            <option value=''>---Select {placeholder}---</option>
            {
                options.map(option=><option key={option._id} value={option._id}>{option.value}</option>)
            }
        </select>
    );
};

export default SelectInputField;