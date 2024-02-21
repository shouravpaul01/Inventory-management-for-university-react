import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const InputSearch = ({ setSearchValue,classNameSearch,classNameSearchBtn }) => {
    const [searchParams] = useSearchParams();
    const paramSearchValue = searchParams.get('search');
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchValue(e.target.value)
        }
    }
    return (
        <div className="relative  w-full">
            <input
                type="text"
                id="SearchValue"
                defaultValue={paramSearchValue || ''}
                placeholder="Search..."
                className={`py-1 px-4  w-full  ${classNameSearch}`}
                onKeyDown={handleSearch}

            />
            <button type="submit" onClick={() => setSearchValue(document.getElementById('SearchValue').value)} className={`absolute inset-y-0  right-0 flex items-center px-3 font-bold ${classNameSearchBtn}`}>
                <IoSearch />
            </button>
        </div>
    );
};

export default InputSearch;