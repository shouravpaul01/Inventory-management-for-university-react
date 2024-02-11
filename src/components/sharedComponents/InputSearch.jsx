import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";


const InputSearch = ({searchValue, setSearchValue,classNameSearch,classNameSearchBtn }) => {
    const [searchParams] = useSearchParams();
    const searchParamsData = searchParams.get('search');
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value,'ee');
            setSearchValue(e.target.value)
        }
    }
    return (
        <div className="relative  w-full">
            <input
                type="text"
                id="SearchValue"
                defaultValue={searchParamsData}
                placeholder="Search..."
                className={`py-2 px-4  w-full  ${classNameSearch}`}
                onKeyDown={handleSearch}

            />
            <button type="submit" onClick={() => setSearchValue(document.getElementById('SearchValue').value)} className={`absolute inset-y-0  right-0 flex items-center px-3 text-white font-bold ${classNameSearchBtn}`}>
                <IoSearch />
            </button>
        </div>
    );
};

export default InputSearch;