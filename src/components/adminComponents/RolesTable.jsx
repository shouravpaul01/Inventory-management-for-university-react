import React, { useState } from 'react';
import { FaCircleInfo, FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import axiosInstance from '../../../axios.config';
import Modal from '../sharedComponents/Modal';
import LoadingMini from '../sharedComponents/LoadingMini';
import RoleForm from './RoleForm';
import { toast } from 'react-toastify';

const RolesTable = ({ roles, mutate }) => {
    const [editData, setEditData] = useState(null)
    const [modalId, setModalId] = useState(null)

    const handleDelete = (_id) => {
        axiosInstance.delete(`/role/${_id}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })

    }

    const handleEdit = (_id) => {
        axiosInstance.get(`/role/edit/${_id}`).then(res => {
            setEditData(res?.data)
        })

    }

    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setEditData(null)
    }
    console.log(roles);
    return (
        <>
            <div className="overflow-x-auto bg-white my-3">
                <table className="table">
                    {
                        roles.length == 0 && <caption className=" caption-bottom">
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
                            <th>Role</th>
                            <th>Permissions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles?.map((role, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{role?.role}</td>
                                <td >
                                    <div className='flex gap-1'>
                                        {role?.permissions?.map((permission, index) => <span key={index} className='badge badge-success'>{permission}</span>)}
                                    </div>
                                </td>
                                <td className="space-x-2">
                                    <button onClick={() => { handleEdit(role?._id), setModalId(role?._id) }} className="btn btn-sm btn-circle btn-primary"><FaPenToSquare /></button>
                                    <button onClick={() => handleDelete(role?._id)} className="btn  btn-sm btn-circle btn-error"><FaRegTrashCan /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <Modal width={'max-w-xl h-[600px]'} title={'Edit Role'} modalId={modalId} handleCloseModal={handleCloseModal}>
                {editData ? <RoleForm editData={editData} mutate={mutate} handleCloseModal={handleCloseModal} /> : <LoadingMini />}
            </Modal>
        </>
    );
};

export default RolesTable;