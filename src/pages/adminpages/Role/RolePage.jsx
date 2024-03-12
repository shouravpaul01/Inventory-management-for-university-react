import { useState } from "react";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import Pagination from "../../../components/sharedComponents/Pagination";
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";
import Loading from "../../../components/sharedComponents/Loading";
import RolesTable from "../../../components/adminComponents/rolesTable";
import RoleForm from "../../../components/adminComponents/RoleForm";
import { FaCircleInfo } from "react-icons/fa6";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const RolePage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')

    const { data: roles = [], mutate: roleMutate, isLoading } = useSWR(`/role?page=${currentPage}&search=${searchValue}`, fetcher)


    return (
        <section >
            <div className="bg-gray-100 ">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">Add Role</p>
                <RoleForm mutate={roleMutate} />


            </div>
            <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Roles</p>
                <div className="px-4 py-5">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} classNameSearch={'rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                    </div>

                    {
                        isLoading ? <Loading /> : <RolesTable roles={roles?.data} mutate={roleMutate} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={roles?.totalPages} />
                </div>
            </div>
        </section>
    );
};

export default RolePage;