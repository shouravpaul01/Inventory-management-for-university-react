import { useState } from "react";
import axiosInstance from "../../../axios.config";
import { FaArrowRightArrowLeft, FaArrowRotateRight, FaCircleInfo, FaCirclePlus, FaPenToSquare, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import Modal from "../sharedComponents/Modal";
import LoadingMini from "../sharedComponents/LoadingMini";
import useCheckPermission from "../../hooks/useCheckPermission";
import AccessoryForm from "./AccessoryForm";
import { Link } from "react-router-dom";


const AccessoriesTable = ({ accessories, mutate }) => {
    const [editData, setEditData] = useState(null)
    const [modalId, setModalId] = useState(null)
    const [errorQtyInput, setErrorQtyInput] = useState(null)
    const [isDisableContent, setIsDisableContent] = useState(false)
    console.log(isDisableContent);
    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'Accessories status'])
    const checkDeletePermission = useCheckPermission(['All', 'Accessories delete'])

    const handleDisableContent = (_id) => {
        const quantity = document.getElementById(_id)
       console.log(quantity);
        if (isDisableContent._id==_id) {
            setIsDisableContent(prev=>({ _id: prev._id ,isOpen:!prev.isOpen}))
            setErrorQtyInput(null)
            if (quantity) {
                quantity.value = '' 
            }
        }else{
            setIsDisableContent({ _id: _id ,isOpen:true})
            setErrorQtyInput(null) 
            if (quantity) {
                quantity.value = '' 
            }
        }
       
    }
    const handleDelete = (_id) => {
        axiosInstance.delete(`/accessory/${_id}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })

    }
    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/accessory/update-status/?_id=${_id}&status=${status}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })
    }
    const handleQuantityUpdate = (_id) => {
        const quantity = document.getElementById(_id).value
        console.log(quantity, 'quantity');
        if (!quantity) {
            setErrorQtyInput({ _id: _id, message: 'The field is required.' })
            return
        } else if (quantity < 0) {
            setErrorQtyInput({ _id: _id, message: 'Allowed Only Positive number' })
            return
        }
        axiosInstance.patch(`/accessory/update-quantity?_id=${_id}&quantity=${quantity}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
            setIsDisableContent({ _id: _id ,isOpen:false})
        })
    }
    const handleEdit = (_id) => {

        axiosInstance.get(`/accessory/edit/${_id}`).then(res => {
            setEditData(res?.data)
        })

    }
    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setEditData(null)
    }
    return (
        <>
            <div className="overflow-x-auto h-96 bg-white my-3">
                <table className="table ">
                    {
                        accessories?.length == 0 && <caption className=" caption-bottom">
                            <div className='flex gap-2 items-center justify-center text-lg py-2'>
                                <FaCircleInfo />
                                <span className=''>Data not found.</span>
                            </div>

                        </caption>
                    }
                    {/* head */}
                    <thead className='bg-green-200 text-sm'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Category</th>
                            {/* <th>Sub Cat</th> */}
                            {
                                //Condition of permission
                                checkStatusPermission && <th>Status</th>
                            }
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            accessories?.map((accessory, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{accessory?.name}</td>
                                <td>
                                    <div className="dropdown dropdown-bottom">
                                        <div className="indicator">
                                            <span className="indicator-item badge badge-secondary">{accessory?.currentQuantity}</span>
                                            <button tabIndex={0} role="button" className="btn btn-xs btn-primary " onClick={() => handleDisableContent(accessory._id)}><FaPlus />Add</button>

                                        </div>


                                        {
                                            (isDisableContent?._id == accessory._id && isDisableContent?.isOpen) && <div tabIndex={0} className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-60 ">
                                                <div className="flex flex-row gap-1">
                                                    <input type="number" id={accessory._id} placeholder="More Stock" className="px-4 py-1 w-full  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                                    <Link onClick={() => handleQuantityUpdate(accessory._id)} className="btn btn-sm btn-primary"><FaArrowRotateRight /> Update</Link>
                                                </div>

                                                {
                                                    errorQtyInput?._id == accessory._id && <p className="text-red-500 ps-1">{errorQtyInput.message}</p>
                                                }

                                            </div>
                                        }
                                    </div>
                                </td>
                                <td>{accessory?.category?.name}</td>
                                {/* <td>{accessory?.subCategory?.name}</td> */}
                                <td>
                                    {
                                        //Condition of permission
                                        checkStatusPermission ? <button onClick={() => handleStatus(accessory?._id, accessory.status ? false : true)} className={`btn btn-xs uppercase ${accessory?.status ? 'btn-primary' : 'btn-error'}`}><FaArrowRightArrowLeft /> {accessory?.status ? "Approved" : "Pending"}</button> : <span className={`badge ${accessory?.status ? 'badge-primary' : 'badge-error'}`}>{accessory?.status ? 'Aproved' : 'Pending'}</span>

                                    }
                                </td>
                                <td className="flex gap-1">
                                    <button onClick={() => { handleEdit(accessory?._id), setModalId(accessory?._id) }} className="btn btn-sm btn-circle btn-primary"><FaPenToSquare /></button>
                                    {
                                        checkDeletePermission && <button onClick={() => handleDelete(accessory?._id)} className="btn  btn-sm btn-circle btn-error"><FaRegTrashCan /></button>
                                    }

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <Modal width={'max-w-3xl'} title={'Edit Accessorie'} modalId={modalId} handleCloseModal={handleCloseModal}>
                {editData ? <AccessoryForm editData={editData} mutate={mutate} /> : <LoadingMini />}
            </Modal>
        </>
    );
};

export default AccessoriesTable;