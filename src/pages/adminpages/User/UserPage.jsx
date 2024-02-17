import { useState } from "react";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import Pagination from "../../../components/sharedComponents/Pagination";
import useSWR from "swr";
import Loading from "../../../components/sharedComponents/Loading";
import UserTable from "../../../components/adminComponents/UserTable";
import axiosInstance from "../../../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const UserPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const { data: users = [], mutate:userMutate, isLoading } = useSWR(`/user?page=${currentPage}&search=${searchValue}`, fetcher)
    return (
       <section>
        <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Users</p>
                <div className="px-4 py-5">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} classNameSearch={'rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                    </div>

                    {
                       isLoading ?<Loading/> : <UserTable users={users?.data} mutate={userMutate} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={users?.totalPages} />
                </div>
            </div>
       </section>
    );
};

export default UserPage;