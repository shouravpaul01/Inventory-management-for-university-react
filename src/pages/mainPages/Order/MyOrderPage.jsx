import { useState } from "react";
import axiosInstance from "../../../../axios.config";
import useSWR from "swr";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import MyOrderTable from "../../../components/mainComponents/MyOrderTable";
import Pagination from "../../../components/sharedComponents/Pagination";
import Modal from "../../../components/sharedComponents/Modal";
import ReturnAccessoriesTable from "../../../components/mainComponents/ReturnAccessoriesTable";
import AllAccessoriesTable from "../../../components/mainComponents/AllAccessoriesTable";
import useAuth from "../../../hooks/useAuth";
import LoadingMini from "../../../components/sharedComponents/LoadingMini";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const MyOrderPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const {user}=useAuth()
    const [filterByDate, setFilterByDate] = useState(null)
    const [fromAndToDate, setFromAndToDate] = useState({})
    const [modalId, setModalId] = useState(null)
    const [returnAccessories, setReturnAccessories] = useState(null)
    const [allAccessories, setAllAccessories] = useState(null)

    const { data: myOrders = [],mutate:myOrderMutate, isLoading } = useSWR(filterByDate ? `/order/my-order?email=${user?.email}&page=${currentPage}&fromdate=${filterByDate?.fromDate}&toDate=${filterByDate?.toDate}` : `/order/my-order?email=${user?.email}&page=${currentPage}`, fetcher)

    const handleFilterByDate = (date) => {
        setFilterByDate(date)
    }
    const handleShowReturnAccessoris = (orderId) => {
        axiosInstance.get(`/order/returnable-accessories/${orderId}`)
        .then(res=>{
            if (res.data.code==200) {
                setReturnAccessories({accessories:res.data?.data?.accessories,orderId:res.data.data._id})
            }
        })
       
    }
    const handleShowAllAccessoris = (accessories, orderId) => {
        setAllAccessories(accessories)
    }
    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setReturnAccessories(null)
        setAllAccessories(null)
    }
    
    return (
        <>
            <section className="my-container py-10">
                <div className="flex justify-end gap-2 pt-3">
                    <Flatpickr
                        className="input input-sm input-bordered focus:outline-none focus-within:border-violet-500 "
                        placeholder="Select From Date"
                        value={fromAndToDate?.fromDate}
                        onChange={(selectedDates, dateStr, ins) => {
                            setFromAndToDate(prev => prev.fromDate ? {} : { 'fromDate': dateStr })
                        }}
                        options={{
                            dateFormat: 'Y-m-d', // Example date format
                            // Add more Flatpickr options as needed
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
                    <button onClick={() => handleFilterByDate(fromAndToDate)} className="btn btn-sm btn-primary " disabled={(fromAndToDate?.fromDate && fromAndToDate?.toDate) ? false : true}>Filter By Date</button>
                </div>
                <div className="py-3">
                    <MyOrderTable myOrders={myOrders?.data} myOrderMutate={myOrderMutate} handleShowReturnAccessoris={handleShowReturnAccessoris} handleShowAllAccessoris={handleShowAllAccessoris} setModalId={setModalId} />
                </div>
                <div >
                    <Pagination totalPages={myOrders?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </section>
            <Modal width={'max-w-2xl'} title={`${allAccessories?'All Accessories':'Return Accessories'}`} modalId={modalId} handleCloseModal={handleCloseModal}>
                {
                returnAccessories && <ReturnAccessoriesTable returnAccessories={returnAccessories?.accessories} orderId={returnAccessories?.orderId} setReturnAccessories={setReturnAccessories} handleCloseModal={handleCloseModal} />
            }
                {allAccessories && <AllAccessoriesTable allAccessories={allAccessories}/> }
            </Modal>
        </>
    );
};

export default MyOrderPage;