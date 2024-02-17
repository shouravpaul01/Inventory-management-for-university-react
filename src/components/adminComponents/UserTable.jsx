import React, { useState } from 'react';
import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import axiosInstance from '../../../axios.config';
import { toast } from 'react-toastify';

const UserTable = ({users,mutate}) => {
    const [modalId, setModalId] = useState(null)

    const handleDelete = (_id) => {
        axiosInstance.delete(`/user/${_id}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })

    }
    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/user/update-status/?_id=${_id}&status=${status}`).then(res => {
            mutate()
            toast.success(res?.data?.message)
        })
    }
    const handleShowDetails = (_id) => {

        axiosInstance.get(`/category/edit/${_id}`).then(res => {
            document.getElementById(res.data._id).showModal()
           
        })

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
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>
                                    <button onClick={() => handleStatus(user?._id, user.status == 'active' ? 'inactive' : 'active')} className={`btn btn-xs uppercase ${user?.status == 'active' ? 'btn-primary' : 'btn-error'}`}>{user?.status=='active'?'Approve':'Pending'}</button>
                                </td>
                                <td className="space-x-2">
                                    <button onClick={() => { handleShowDetails(user?._id), setModalId(user?._id) }} className="btn btn-sm btn-circle btn-primary"><FaPenToSquare /></button>
                                    <button onClick={() => handleDelete(user?._id)} className="btn  btn-sm btn-circle btn-error"><FaRegTrashCan /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {/* <Modal width={'max-w-xl'} modalId={modalId} >
                
            </Modal> */}
        </>

    );
};

export default UserTable;