import { FaArrowRightArrowLeft, FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import axiosInstance from '../../../axios.config';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Modal from '../sharedComponents/Modal';
import SubCategoryForm from './SubCategoryForm';
import LoadingMini from '../sharedComponents/LoadingMini';
import useCheckPermission from '../../hooks/useCheckPermission';

const SubCategoryTable = ({ subCategories, subCategoryMutate }) => {
    const [editData, setEditData] = useState(null)
    const [modalId, setModalId] = useState(null)

    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'SubCategory status'])
    const checkDeletePermission = useCheckPermission(['All', 'SubCategory delete'])

    const handleDelete = (_id) => {
        axiosInstance.delete(`/sub-cat/${_id}`).then(res => {
            subCategoryMutate()
            toast.success(res?.data?.message)
        })
    }
    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/sub-cat/update-status/?_id=${_id}&status=${status}`).then(res => {
            subCategoryMutate()
            toast.success(res?.data?.message)
        })
    }
    const handleEdit = (_id) => {
        axiosInstance.get(`/sub-cat/edit/${_id}`).then(res => {
            setEditData(res?.data)
        })
    }
    const handleCloseModal = () => {
        setModalId(null)
        setEditData(null)
    }
    console.log(editData);
    return (
        <>
            <div className="overflow-x-auto bg-white my-3">
                <table className="table">
                    {/* head */}
                    <thead className='bg-green-200 text-sm'>
                        <tr>
                            <th></th>
                            <th>Category </th>
                            <th>Sub Category </th>
                            {
                                //Condition of permission
                                checkStatusPermission && <th>Status</th>
                            }
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subCategories?.map((subCategory, index) => <tr key={subCategory?._id}>
                                <th>{index + 1}</th>
                                <td>{subCategory?.category?.name}</td>
                                <td>{subCategory?.name}</td>
                                {
                                    checkStatusPermission && <td>
                                        <button onClick={() => handleStatus(subCategory?._id, subCategory.status == 'active' ? 'inactive' : 'active')} className={`btn btn-xs uppercase ${subCategory?.status == 'active' ? 'btn-primary' : 'btn-error'}`}><FaArrowRightArrowLeft /> {subCategory?.status}</button>
                                    </td>
                                }
                                <td className="flex gap-1">
                                    <button onClick={() => { handleEdit(subCategory?._id), setModalId(subCategory?._id) }} className="btn btn-xs btn-circle btn-primary"><FaPenToSquare /></button>
                                    {
                                        checkDeletePermission && <button onClick={() => handleDelete(subCategory?._id)} className="btn  btn-xs btn-circle btn-error"><FaRegTrashCan /></button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Modal width={'max-w-xl'} title={'Edit Sub Category'} modalId={modalId} handleCloseModal={handleCloseModal} >
                {editData ? <SubCategoryForm editData={editData} subCategoryMutate={subCategoryMutate} /> : <LoadingMini />}
            </Modal>
        </>
    );
};

export default SubCategoryTable;