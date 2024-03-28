import CategoryTable from "../../../components/adminComponents/CategoryTable";
import InputField from "../../../components/sharedComponents/InputField";
import { FaCirclePlus } from "react-icons/fa6";
import Pagination from "../../../components/sharedComponents/Pagination";
import { useState } from "react";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../../axios.config";
import { toast } from "react-toastify";
import useSWR from "swr";
import Loading from "../../../components/sharedComponents/Loading";
import CategoryForm from "../../../components/adminComponents/CategoryForm";
import useCategories from "../../../hooks/useCategories";


const CategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    
    const {categories,mutate,isLoading}=useCategories(currentPage,searchValue)
    

    return (
        <section >
            <div className="bg-gray-100 ">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">Add Category</p>
               <CategoryForm mutate={mutate}/>


            </div>
            <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Categories</p>
                <div className="px-4 py-5">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} classNameSearch={'border border-violet-400 rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                    </div>

                    {
                       isLoading ?<Loading/> : <CategoryTable categories={categories?.data} mutate={mutate} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={categories?.totalPages} />
                </div>
            </div>
        </section>
    );
};

export default CategoryPage;