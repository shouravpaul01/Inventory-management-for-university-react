import { useForm } from "react-hook-form";


const InputField = ({ placeholder, name }) => {
    const { register } = useForm();
    return (
        <input
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            placeholder={placeholder}
            {...register(name)}
        />
    );
};

export default InputField;