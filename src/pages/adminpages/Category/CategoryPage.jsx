import CategoryTable from "../../../components/adminComponents/CategoryTable";
import InputField from "../../../components/sharedComponents/InputField";
import { FaCirclePlus } from "react-icons/fa6";
import Pagination from "../../../components/sharedComponents/Pagination";
import { useState } from "react";
import InputSearch from "../../../components/sharedComponents/InputSearch";


const CategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    return (
        <section >
            <div className="bg-gray-100 ">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">Add Category</p>
                <form className="p-5">
                    <div className="w-full md:w-96 flex gap-2">

                        <InputField placeholder={"Category"} name={'name'} />
                        <button type="submit" className="btn  btn-primary"><FaCirclePlus /> Add</button>
                    </div>

                </form>
            </div>
            <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Categories</p>
                <div className="px-4 py-5">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} />
                    </div>


                    <CategoryTable />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;