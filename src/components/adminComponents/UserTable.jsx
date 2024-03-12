import React, { useState } from 'react';
import { FaArrowRightArrowLeft, FaCircleInfo, FaInfo, FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import axiosInstance from '../../../axios.config';
import { toast } from 'react-toastify';
import Modal from '../sharedComponents/Modal';
import UserDeails from './UserDeails';
import SetUserRolesFrom from './SetUserRolesFrom';
import useAuth from '../../hooks/useAuth';
import useCheckPermission from '../../hooks/useCheckPermission';

const UserTable = ({ users, mutate }) => {
    const [modalId, setModalId] = useState(null)
    const [showRoles, setShowRoles] = useState(null)
    const { user, logout, isLoading } = useAuth()

    //Permission
    const checkStatusPermission = useCheckPermission(['All', 'User status'])
    const checkRolePermission = useCheckPermission(['All', 'User role'])
    const checkDelatePermission = useCheckPermission(['All', 'User delete'])

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
    const handleShowRoles = (_id) => {

        axiosInstance.get(`/user/role/${_id}`).then(res => {
            const roles = res.data.role?.map(role => role && { _id: role._id, value: role.role, label: role.role })
            console.log(res.data.role);
            setShowRoles({ userId: _id, roles: roles })
        })

    }
    //Close Modal
    const handleCloseModal = () => {
        setModalId(null)
        setShowRoles(null)
    }
    console.log(showRoles);
    return (
        <>
            <div className="overflow-x-auto bg-white my-3">
                <table className="table">
                    {
                        users?.length == 0 && <caption className=" caption-bottom">
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
                            <th>Email</th>
                            <th>Role</th>
                            {
                                checkStatusPermission && <th>Status</th>
                            }
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td className='flex items-center gap-1'>
                                    {user?.role?.map((role, index) => <span key={index} className='badge badge-success'>{role.role}</span>)}

                                    {
                                        //Condition of Permission
                                        checkRolePermission && <button onClick={() => { handleShowRoles(user?._id), setModalId(user?._id) }} className="btn btn-sm btn-circle btn-primary"><FaPenToSquare /></button>
                                    }

                                </td>

                                {
                                    //Condition of Permission
                                    checkStatusPermission && <td>
                                        <button onClick={() => handleStatus(user?._id, user.status ? false : true)} className={`btn btn-xs uppercase ${user?.status ? 'btn-primary' : 'btn-error'}`}><FaArrowRightArrowLeft /> {user?.status ? 'Approve' : 'Pending'}</button>
                                    </td>
                                }

                                <td >
                                    <div className='flex gap-1'>
                                        <button className="btn btn-xs btn-circle btn-primary"><FaInfo /></button>
                                        {
                                            //Condition of Permission
                                            checkDelatePermission && <button onClick={() => handleDelete(user?._id)} className="btn btn-xs btn-circle btn-error"><FaRegTrashCan /></button>
                                        }
                                    </div>


                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <Modal width={'max-w-xl h-[400px]'} title={'Set Roles'} modalId={modalId} handleCloseModal={handleCloseModal} >
                {/* <UserDeails details={details}/> */}
                <SetUserRolesFrom roles={showRoles} handleCloseModal={handleCloseModal} mutate={mutate} />
            </Modal>
        </>

    );
};

export default UserTable;