import { useForm } from "react-hook-form";


const InputField = ({ placeholder }) => {
   
    return (
        <input
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder={placeholder}
            
        />
    );
};

export default InputField;