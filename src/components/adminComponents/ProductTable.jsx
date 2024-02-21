import { useState } from "react";
import axiosInstance from "../../../axios.config";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import Modal from "../sharedComponents/Modal";
import ProductForm from "./ProductForm";


const ProductTable = ({products,productMutate}) => {
    const [editData, setEditData] = useState(null)
    const [modalId, setModalId] = useState(null)

    const handleDelete = (_id) => {
        axiosInstance.delete(`/product/${_id}`).then(res => {
            productMutate()
            toast.success(res?.data?.message)
        })

    }
    const handleStatus = (_id, status) => {
        axiosInstance.patch(`/product/update-status/?_id=${_id}&status=${status}`).then(res => {
            productMutate()
            toast.success(res?.data?.message)
        })
    }
    const handleEdit = (_id) => {

        axiosInstance.get(`/product/edit/${_id}`).then(res => {
            document.getElementById(res.data._id).showModal()
            setEditData(res?.data)
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
                        <th>Qty</th>
                        <th>Category</th>
                        <th>Sub Cat</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((product, index) => <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{product?.name}</td>
                            <td>{product?.quantity}</td>
                            <td>{product?.category?.name}</td>
                            <td>{product?.subCategory?.name}</td>
                            <td>
                                <button onClick={() => handleStatus(product?._id, product.status == 'active' ? 'inactive' : 'active')} className={`btn btn-xs uppercase ${product?.status == 'active' ? 'btn-primary' : 'btn-error'}`}>{product?.status}</button>
                            </td>
                            <td className="space-x-2">
                                <button onClick={() => { handleEdit(product?._id), setModalId(product?._id) }} className="btn btn-sm btn-circle btn-primary"><FaPenToSquare /></button>
                                <button onClick={() => handleDelete(product?._id)} className="btn  btn-sm btn-circle btn-error"><FaRegTrashCan /></button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
        <Modal width={'max-w-3xl'} title={'Edit Accessorie'} modalId={modalId} >
            <ProductForm editData={editData} productMutate={productMutate}/>
        </Modal>
    </>
    );
};

export default ProductTable;