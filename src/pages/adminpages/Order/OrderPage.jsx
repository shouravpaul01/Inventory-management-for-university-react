import { useState } from "react";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import Loading from "../../../components/sharedComponents/Loading";
import Pagination from "../../../components/sharedComponents/Pagination";
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";
import Modal from "../../../components/sharedComponents/Modal";
import ReturnAccessoriesTable from "../../../components/adminComponents/ReturnAccessoriesTable";
import AllAccessoriesTable from "../../../components/mainComponents/AllAccessoriesTable";
import OrderTable from "../../../components/adminComponents/OrderTable";
import { FaCalendarDays } from "react-icons/fa6";
import { IoFilterSharp } from "react-icons/io5";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const OrderPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filterByDate, setFilterByDate] = useState(null)
    const [fromAndToDate, setFromAndToDate] = useState({})
    const [modalId, setModalId] = useState(null)
    const [returnAccessories, setReturnAccessories] = useState(null)
    const [allAccessories, setAllAccessories] = useState(null)
    const { data: orders = [], mutate:ordersMutate, isLoading } = useSWR(`/order?page=${currentPage}&search=${searchValue}`, fetcher)

    const handleFilterByDate = (date) => {
        setFilterByDate(date)
    }
    const handleShowReturnAccessoris =(accessories, orderId) => {
        setReturnAccessories({accessories:accessories,orderId:orderId})
    }
    const handleShowAllAccessoris = (accessories, orderId) => {
        setAllAccessories(accessories)
    }
    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setAllAccessories(null)
    }
    const handleClose=()=>{
        setReturnAccessories(null)
    }
   
    return (
        <section>
           {
           returnAccessories && <div className="">
            <div className="flex items-center bg-violet-700  py-2 px-4">
            <p className="font-bold text-white grow">Return Accessories</p>
            <button className="shrink btn btn-sm btn-circle btn-error" onClick={()=>handleClose()}>X</button>
            </div>
            <div className="bg-gray-100 p-4">
                
                 <ReturnAccessoriesTable returnAccessories={returnAccessories} setReturnAccessories={setReturnAccessories} ordersMutate={ordersMutate}/>


            </div> 
           </div>
           
            }
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
                            appendTo: document.body, 
                           
                            slotChar:<FaCalendarDays />
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
                       isLoading ?<Loading/> : <OrderTable orders={orders?.data} mutate={ordersMutate} handleShowReturnAccessoris={handleShowReturnAccessoris} handleShowAllAccessoris={handleShowAllAccessoris} setModalId={setModalId} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={orders?.totalPages} />
                </div>
            </div>
            <Modal width={'max-w-2xl  h-[500px]'} title={`'All Accessories'`} modalId={modalId} handleCloseModal={handleCloseModal}>
                
                {allAccessories && <AllAccessoriesTable allAccessories={allAccessories}/> }
            </Modal>
       </section>
    );
};

export default OrderPage;