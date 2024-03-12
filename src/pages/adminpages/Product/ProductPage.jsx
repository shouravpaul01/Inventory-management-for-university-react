import InputSearch from '../../../components/sharedComponents/InputSearch';
import ProductTable from '../../../components/adminComponents/ProductTable';
import Pagination from '../../../components/sharedComponents/Pagination';
import ProductForm from '../../../components/adminComponents/ProductForm';
import axiosInstance from '../../../../axios.config';
import useSWR from 'swr';
import { useState } from 'react';
import { FaCircleInfo, FaCirclePlus } from 'react-icons/fa6';
import useProducts from '../../../hooks/useProducts';
import Loading from '../../../components/sharedComponents/Loading';

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


                    
                            <div className="w-full md:w-80">
                                <InputSearch setSearchValue={setSearchValue} classNameSearch={'rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'}/>
                            </div>
                            {
                                isLoading ? <Loading /> : <ProductTable products={products?.data} productMutate={productMutate} />
                            }

                           
                            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={products?.totalPages} />
                       


                </div>
            </div>
        </section>
    );
};

export default ProductPage;