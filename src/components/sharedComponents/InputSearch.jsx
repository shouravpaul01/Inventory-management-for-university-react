import { IoSearch } from "react-icons/io5";

const InputSearch = ({ setSearchValue,classNameSearch,classNameSearchBtn }) => {
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