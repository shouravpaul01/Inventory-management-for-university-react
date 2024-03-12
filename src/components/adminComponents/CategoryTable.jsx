import { FaArrowRightArrowLeft, FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import axiosInstance from "../../../axios.config";
import { toast } from "react-toastify";
import Modal from "../sharedComponents/Modal";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import LoadingMini from "../sharedComponents/LoadingMini";
import useCheckPermission from "../../hooks/useCheckPermission";

const CategoryTable = ({ categories, mutate }) => {
    const [editData, setEditData] = useState(null)
    const [modalId, setModalId] = useState(null)
    
    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'Category status'])
    const checkDeletePermission= useCheckPermission(['All', 'Category delete'])

    const handleDelete = (_id) => {
        axiosInstance.delete(`/category/${_id}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })

    }
    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/category/update-status/?_id=${_id}&status=${status}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })
    }
    const handleEdit = (_id) => {
        axiosInstance.get(`/category/edit/${_id}`).then(res => {
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
            <div className="overflow-x-auto bg-white my-3">
                <table className="table">
                    {/* head */}
                    <thead className='bg-green-200 text-sm'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            {
                                //Condition of permission
                                checkStatusPermission && <th>Status</th>
                            }
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((category, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{category?.name}</td>
                                {
                                    //Condition of permission
                                    checkStatusPermission && <td>
                                        <button onClick={() => handleStatus(category?._id, category.status == 'active' ? 'inactive' : 'active')} className={`btn btn-xs uppercase ${category?.status == 'active' ? 'btn-primary' : 'btn-error'}`}><FaArrowRightArrowLeft /> {category?.status}</button>
                                    </td>
                                }

                                <td className="space-x-2">

                                    <button onClick={() => { handleEdit(category?._id), setModalId(category?._id) }} className="btn btn-xs btn-circle btn-primary"><FaPenToSquare /></button>
                                    {
                                        //Condition of permission
                                        checkDeletePermission && <button onClick={() => handleDelete(category?._id)} className="btn  btn-xs btn-circle btn-error"><FaRegTrashCan /></button>
                                    }

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <Modal width={'max-w-xl'} title={'Edit Category'} modalId={modalId} handleCloseModal={handleCloseModal}>
                {editData ? <CategoryForm editData={editData} mutate={mutate} /> : <LoadingMini />}
            </Modal>
        </>

    );
};

export default CategoryTable;