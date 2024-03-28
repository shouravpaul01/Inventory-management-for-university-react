import React, { useState } from 'react';
import InputSearch from '../../../components/sharedComponents/InputSearch';
import Loading from '../../../components/sharedComponents/Loading';
import Pagination from '../../../components/sharedComponents/Pagination';
import DistributeTable from '../../../components/adminComponents/DistributeTable';
import useSWR from 'swr';
import axiosInstance from '../../../../axios.config';
import Modal from '../../../components/sharedComponents/Modal';
import DistributedAllAccessoriesTable from '../../../components/adminComponents/DistributedAllAccessoriesTable';
import FilterByDate from '../../../components/sharedComponents/FilterByDate';

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const DistributesPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [contentHide, setContentHide] = useState(false)
    const [filterByDate, setFilterByDate] = useState(null)
    const [modalId, setModalId] = useState(null)
    const [allAccessories, setAllAccessories] = useState(null)

    const { data: distributedAccessories = [], mutate: distributedAccessoriesMutate, isLoading } = useSWR(`/distributed-accessories?page=${currentPage}&search=${searchValue}&filterByDate=${JSON.stringify(filterByDate)}`, fetcher)
    console.log(distributedAccessories, 'data');

    
    const handleShowAllAccessoris = (accessories, orderDate, orderId) => {
        setAllAccessories({ accessories: accessories, orderdate: orderDate })
    }
    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setAllAccessories(null)
    }
    return (
        <section >

            <div className="bg-gray-100 mt-4">
                <div className='flex items-center bg-violet-700 py-2 px-4'>

                    <p className="font-bold text-white flex-1">Distributed Accessories</p>
                </div>
                
                <div className="px-4 py-5">

                    <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                        <div className="w-full md:w-80">
                            <InputSearch setSearchValue={setSearchValue} classNameSearch={' border border-violet-400 rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                        </div>
                        <FilterByDate setFilterByDate={setFilterByDate} />
                    </div>
                    {
                        isLoading ? <Loading /> : <DistributeTable distributedAccessories={distributedAccessories?.data} mutate={distributedAccessoriesMutate} handleShowAllAccessoris={handleShowAllAccessoris} setModalId={setModalId} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={distributedAccessories?.totalPages} />
                </div>
            </div>
            <Modal width={'max-w-2xl  h-[500px]'} title={`Distributed All Accessories`} modalId={modalId} handleCloseModal={handleCloseModal}>

                {allAccessories && <DistributedAllAccessoriesTable allAccessories={allAccessories} />}
            </Modal>
        </section>
    );
};

export default DistributesPage;