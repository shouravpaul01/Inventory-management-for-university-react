import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";


const InputSearch = ({ setSearchValue }) => {

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchValue(e.target.value)
        }
    }
    return (
        <div className="relative w-full">
            <input
                type="text"
                id="SearchValue"
                placeholder="Search..."
                className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 w-full"
                onKeyDown={handleSearch}

            />
            <button type="submit" onClick={() => setSearchValue(document.getElementById('SearchValue').value)} className="absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md bg-indigo-700 text-white font-bold">
                <IoSearch />
            </button>
        </div>
    );
};

export default InputSearch;