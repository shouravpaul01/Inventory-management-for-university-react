import { FaCirclePlus } from "react-icons/fa6";
import CategoryTable from "../../../components/adminComponents/CategoryTable";
import InputField from "../../../components/sharedComponents/InputField";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import Pagination from "../../../components/sharedComponents/Pagination";
import { useState } from "react";
import SubCategoryTable from "../../../components/adminComponents/SubCategoryTable";
import SelectInputField from "../../../components/sharedComponents/SelectInputField";


const SubCategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')

    return (
        <section >
            <div className="bg-gray-100 ">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">Add Sub Category</p>
                <form className="p-5">
                    <div className="w-full flex gap-2">
                        <SelectInputField placeholder={'Category'} name={'category'} />
                        <InputField placeholder={"Sub Category"} name={'name'} />
                        <button type="submit" className="btn h-10 min-h-10  btn-primary"><FaCirclePlus /> Add</button>
                    </div>

                </form>
            </div>
            <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Sub Categories</p>
                <div className="px-4 py-5">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} />
                    </div>


                    <SubCategoryTable />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </section>
    );
};

export default SubCategoryPage;