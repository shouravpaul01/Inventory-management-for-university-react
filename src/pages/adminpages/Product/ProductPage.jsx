import InputSearch from '../../../components/sharedComponents/InputSearch';
import ProductTable from '../../../components/adminComponents/ProductTable';
import Pagination from '../../../components/sharedComponents/Pagination';
import ProductForm from '../../../components/adminComponents/ProductForm';
import axiosInstance from '../../../../axios.config';
import useSWR from 'swr';
import { useState } from 'react';
import { FaCircleInfo, FaCirclePlus } from 'react-icons/fa6';
import useProducts from '../../../hooks/useProducts';

const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [contentHide, setContentHide] = useState(false)

   const {products,productMutate,isLoading}=useProducts(currentPage,searchValue)
    console.log(products.data);
    return (
        <section >
            <div className="bg-gray-100 ">
                <div className='flex items-center bg-violet-700 py-2 px-4'>

                    <p className="font-bold text-white flex-1">Add Product</p>
                    <button onClick={() => setContentHide(!contentHide)} className='btn btn-sm btn-circle btn-error'>hide</button>
                </div>
                {
                    contentHide && <div className=' transition duration-500 '>
                        <ProductForm productMutate={productMutate} />
                    </div>
                }


            </div>
            <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Products</p>
                <div className="px-4 py-5">


                    {
                        products?.data?.length > 0 ? <>
                            <div className="w-full md:w-80">
                                <InputSearch setSearchValue={setSearchValue} />
                            </div>
                            <ProductTable products={products?.data} productMutate={productMutate} />
                            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={products?.totalPages} />
                        </> : <div role="alert" className="alert ">
                            <FaCircleInfo />
                            <span>Data not found.</span>
                            <div>

                                <button onClick={() => setContentHide(true)} className="btn btn-sm btn-primary"><FaCirclePlus /> ADD</button>
                            </div>
                        </div>
                    }


                </div>
            </div>
        </section>
    );
};

export default ProductPage;