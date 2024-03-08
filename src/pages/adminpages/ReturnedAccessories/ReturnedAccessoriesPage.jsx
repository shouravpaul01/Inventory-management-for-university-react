import { IoFilterSharp } from "react-icons/io5";
import Pagination from "../../../components/sharedComponents/Pagination";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import { useState } from "react";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";
import ReturnedAccessoriesTable from "../../../components/adminComponents/ReturnedAccessoriesTable";
import Loading from "../../../components/sharedComponents/Loading";
import Modal from "../../../components/sharedComponents/Modal";
import ReturnableAccessoriesTable from "../../../components/adminComponents/ReturnableAccessoriesTable";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const ReturnedAccessoriesPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filterByDate, setFilterByDate] = useState(null)
    const [fromAndToDate, setFromAndToDate] = useState({})
    const [modalId, setModalId] = useState(null)
    const [returnedAccessories, setReturnedAccessories] = useState(null)

    const { data: returedableAccessories = [],mutate:returnedMutate, isLoading } = useSWR(`/order/returned-all-accessories?page=${currentPage}&fromdate=${filterByDate?.fromDate}&toDate=${filterByDate?.toDate}&search=${searchValue}`, fetcher)

    const handleFilterByDate = (date) => {
        setFilterByDate(date)
    }
   const handleShowReturnedAccessoris=(orderId)=>{
    axiosInstance.get(`/order/returnable-accessories/${orderId}`)
    .then(res=>{
        if (res.data.code==200) {  
            setReturnedAccessories({accessories:res.data?.data?.accessories,orderId:res.data.data._id})
        }
    })
   }
   const handleCloseModal=()=>{
    setModalId(null)
    setReturnedAccessories(null)
   }
   console.log(returnedAccessories);
    return (
        <>
        <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Orders</p>
                <div className="px-4 py-5">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} classNameSearch={'rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 ">
                    <Flatpickr
                        className="input input-sm input-bordered focus:outline-none focus-within:border-violet-500 "
                        placeholder="Select From Date"
                        value={fromAndToDate?.fromDate}
                        onChange={(selectedDates, dateStr, ins) => {
                            setFromAndToDate(prev => prev.fromDate ? {} : { 'fromDate': dateStr })
                        }}
                        options={{
                            dateFormat: 'Y-m-d',  
                        
                        }}
                    />
                    <Flatpickr
                        className={`input input-sm input-bordered focus:outline-none focus:border-violet-500 `}
                        placeholder="Select To Date"
                        value={fromAndToDate?.toDate}
                        onChange={(selectedDates, dateStr, ins) => {
                            setFromAndToDate(prev => prev.toDate ? { fromDate: prev.fromDate } : { ...prev, toDate: dateStr })
                        }}
                        options={{
                            dateFormat: 'Y-m-d',
                        }}
                        disabled={fromAndToDate?.fromDate ? false : true}
                    />
                    <button onClick={() => handleFilterByDate(fromAndToDate)} className="btn btn-sm btn-primary " disabled={(fromAndToDate?.fromDate && fromAndToDate?.toDate) ? false : true}><IoFilterSharp /> Filter By Date</button>
                </div>
                    </div>
                    

                    {
                       isLoading ?<Loading/> : <ReturnedAccessoriesTable orders={returedableAccessories?.data} mutate={returnedMutate} handleShowReturnedAccessoris={handleShowReturnedAccessoris} setModalId={setModalId} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={returedableAccessories?.totalPages} />
                </div>
            </div>
            <Modal width={'max-w-3xl  h-[500px]'} title={`'Returned Accessories'`} modalId={modalId} handleCloseModal={handleCloseModal}>
                
                {returnedAccessories && <ReturnableAccessoriesTable returnedAccessories={returnedAccessories?.accessories} setModalId={setModalId} /> }
            </Modal>
       </>
        
    );
};

export default ReturnedAccessoriesPage;