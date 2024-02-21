import { useState } from "react";
import axiosInstance from "../../../../axios.config";
import useSWR from "swr";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import getReturnAccessories from "../../../utils/getReturnAccessories";
import MyOrderTable from "../../../components/mainComponents/MyOrderTable";
import Pagination from "../../../components/sharedComponents/Pagination";
import Modal from "../../../components/sharedComponents/Modal";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const MyOrderPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [filterByDate, setFilterByDate] = useState(null)
    const [fromAndToDate, setFromAndToDate] = useState({})
    const [modalId, setModalId] = useState('') 

    const { data: myOrders = [], isLoading } = useSWR(filterByDate ? `/order?page=${currentPage}&fromdate=${filterByDate?.fromDate}&toDate=${filterByDate?.toDate}` : `/order?page=${currentPage}`, fetcher)

    const handleFilterByDate = (date) => {
        setFilterByDate(date)
    }
    const handleShowReturnAccessoris = (accessories,orderId) => {
        console.log(accessories);
        setModalId(orderId)
        document.getElementById(orderId).showModal()
    }
    console.log(myOrders);
    return (
        <>
        <section className="my-container py-10">
            <div className="flex justify-end gap-2 pt-3">
                <Flatpickr
                    className="input input-sm input-bordered focus:outline-none focus:border-violet-500"
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
                <MyOrderTable myOrders={myOrders?.data} handleShowReturnAccessoris={handleShowReturnAccessoris}/>
            </div>
            <div >
                <Pagination totalPages={myOrders?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </section>
        <Modal width={'max-w-5xl'} modalId={modalId}>

        </Modal>
        </>
    );
};

export default MyOrderPage;