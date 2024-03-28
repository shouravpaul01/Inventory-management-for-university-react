import React, { useState } from 'react';
import useSWR from 'swr';
import Pagination from '../../../components/sharedComponents/Pagination';
import InputSearch from '../../../components/sharedComponents/InputSearch';
import Loading from '../../../components/sharedComponents/Loading';
import MyAccessoriesTable from '../../../components/adminComponents/MyAccessoriesTable';
import axiosInstance from '../../../../axios.config';
import useAuth from '../../../hooks/useAuth';
import FilterByDate from '../../../components/sharedComponents/FilterByDate';
import Modal from '../../../components/sharedComponents/Modal';
import DistributedAllAccessoriesTable from '../../../components/adminComponents/DistributedAllAccessoriesTable';

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const MyAccessoriesPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filterByDate, setFilterByDate] = useState(null)
    const [modalId, setModalId] = useState(null)
    const [allAccessories, setAllAccessories] = useState(null)
    const { user } = useAuth()


    const { data: myAccessories = [], mutate: myAccessoriesMutate, isLoading } = useSWR(`/distributed-accessories/all-approve-distributed-accessoris-by-email?email=${user?.email}&page=${currentPage}&search=${searchValue}&filterByDate=${JSON.stringify(filterByDate)}`, fetcher)

    const handleShowAllAccessories = (accessories, orderDate, orderId) => {
        setAllAccessories({ accessories: accessories, orderdate: orderDate })
    }
    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setAllAccessories(null)
    }

    return (
        <section className="my-container py-5">
            <div className="px-4 py-5">
                <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                    <div className="w-full md:w-80 pb-3">
                        <InputSearch setSearchValue={setSearchValue} classNameSearch={'rounded-full border border-violet-400 py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                    </div>
                    <FilterByDate setFilterByDate={setFilterByDate} />
                </div>

                {
                    isLoading ? <Loading /> : <MyAccessoriesTable myAccessories={myAccessories?.data} mutate={myAccessoriesMutate} handleShowAllAccessories={handleShowAllAccessories} setModalId={setModalId}/>
                }

                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={myAccessories?.totalPages} />
            </div>
            <Modal width={'max-w-2xl  h-[500px]'} title={`Distributed All Accessories`} modalId={modalId} handleCloseModal={handleCloseModal}>

                {allAccessories && <DistributedAllAccessoriesTable allAccessories={allAccessories} />}
            </Modal>
        </section>
    );
};

export default MyAccessoriesPage;