import { FaCirclePlus } from "react-icons/fa6";
import CategoryTable from "../../../components/adminComponents/CategoryTable";
import InputField from "../../../components/sharedComponents/InputField";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import Pagination from "../../../components/sharedComponents/Pagination";
import { useState } from "react";
import SubCategoryTable from "../../../components/adminComponents/SubCategoryTable";
import SelectInputField from "../../../components/sharedComponents/SelectInputField";
import useCategories from "../../../hooks/useCategories";
import SubCategoryForm from "../../../components/adminComponents/SubCategoryForm";
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const SubCategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')

  
    const { data: subCategories = [], mutate:subCategoryMutate, isLoading } = useSWR(`/sub-cat?page=${currentPage}&search=${searchValue}`, fetcher)
console.log(subCategories);
    return (
        <section >
            <div className="bg-gray-100 ">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">Add Sub Category</p>
               <SubCategoryForm  subCategoryMutate={subCategoryMutate} />
            </div>
            <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Sub Categories</p>
                <div className="px-4 py-5">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} />
                    </div>


                    <SubCategoryTable subCategories={subCategories?.data} subCategoryMutate={subCategoryMutate}/>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={subCategories?.totalPages}/>
                </div>
            </div>
        </section>
    );
};

export default SubCategoryPage;