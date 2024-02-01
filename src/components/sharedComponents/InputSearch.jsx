import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";


const InputSearch = ({ setSearchValue }) => {
    const { register, handleSubmit } = useForm();

    const handleSearch = ({ searchValue }) => {
        setSearchValue(searchValue)
    }
    return (
        <form onSubmit={handleSubmit(handleSearch)} className="relative w-full">

            <input
                type="text"
                id="SearchValue"
                placeholder="Search..."
                className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 w-full"
                {...register('searchValue')}

            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md bg-indigo-700 text-white font-bold">
                <IoSearch />
            </button>
        </form>
    );
};

export default InputSearch;