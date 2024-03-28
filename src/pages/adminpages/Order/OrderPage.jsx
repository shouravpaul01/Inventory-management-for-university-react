import { useState } from "react";
import InputSearch from "../../../components/sharedComponents/InputSearch";
import Loading from "../../../components/sharedComponents/Loading";
import Pagination from "../../../components/sharedComponents/Pagination";
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";
import Modal from "../../../components/sharedComponents/Modal";
import AllAccessoriesTable from "../../../components/mainComponents/AllAccessoriesTable";
import OrderTable from "../../../components/adminComponents/OrderTable";
import { FaCalendarDays } from "react-icons/fa6";
import { IoFilterSharp } from "react-icons/io5";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import DeadlineReturnableAccessoriesTable from "../../../components/adminComponents/DeadlineReturnableAccessoriesTable";
import FilterByDate from "../../../components/sharedComponents/FilterByDate";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const OrderPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [filterByDate, setFilterByDate] = useState(null)
    const [modalId, setModalId] = useState(null)
    const [returnAccessories, setReturnAccessories] = useState(null)
    const [allAccessories, setAllAccessories] = useState(null)
    const { data: orders = [], mutate: ordersMutate, isLoading } = useSWR(`/order?page=${currentPage}&search=${searchValue}&filterByDate=${JSON.stringify(filterByDate)}`, fetcher)

    
    const handleShowReturnAccessories = (createdAt, orderId) => {
        axiosInstance.get(`/order/returnable-accessories/${orderId}`)
        .then(res=>{
            if (res.status==200) {
                setReturnAccessories({accessories:res.data?.data?.accessories,createdAt:createdAt,orderId:res.data.data._id})
            }
        })
    }
    const handleShowAllAccessories = (accessories, createdAt,orderId) => {
       
         setAllAccessories({accessories:accessories,createdAt:createdAt})
    }
    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setAllAccessories(null)
    }
    const handleClose = () => {
        setReturnAccessories(null)
    }

    return (
        <section>
            {
                //Set deadline of returnable accessories
                returnAccessories && <div className="">
                    <div className="flex items-center bg-violet-700  py-2 px-4">
                        <p className="font-bold text-white grow">Returnable Accessories</p>
                        <button className="shrink btn btn-sm btn-circle btn-error" onClick={() => handleClose()}>X</button>
                    </div>
                    <div className="bg-gray-100 p-4">
                        <DeadlineReturnableAccessoriesTable returnAccessories={returnAccessories} setReturnAccessories={setReturnAccessories} ordersMutate={ordersMutate} handleShowReturnAccessories={handleShowReturnAccessories}/>
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
                        <FilterByDate setFilterByDate={setFilterByDate} />
                    </div>
                    {
                        isLoading ? <Loading /> : <OrderTable orders={orders?.data} mutate={ordersMutate} handleShowReturnAccessories={handleShowReturnAccessories} setReturnAccessories={setReturnAccessories} handleShowAllAccessories={handleShowAllAccessories} setModalId={setModalId} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={orders?.totalPages} />
                </div>
            </div>
            <Modal width={'max-w-2xl  h-[500px]'} title={`All Accessories`} modalId={modalId} handleCloseModal={handleCloseModal}>

                {allAccessories && <AllAccessoriesTable allAccessories={allAccessories} />}
            </Modal>
        </section>
    );
};

export default OrderPage;