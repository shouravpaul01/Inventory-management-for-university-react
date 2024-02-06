import React, { useState } from 'react';
import InputSearch from '../../../components/sharedComponents/InputSearch';
import ProductTable from '../../../components/adminComponents/ProductTable';
import Pagination from '../../../components/sharedComponents/Pagination';
import ProductForm from '../../../components/adminComponents/ProductForm';
import axiosInstance from '../../../../axios.config';
import useSWR from 'swr';
const fetcher = url => axiosInstance.get(url).then(res => res.data)
const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')

    const { data: products = [], mutate:productMutate, isLoading } = useSWR(`/product?page=${currentPage}&search=${searchValue}`, fetcher)
    return (
        <section >
            <div className="bg-gray-100 ">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">Add Product</p>
               <ProductForm productMutate={productMutate}/>


            </div>
            <div className="bg-gray-100 mt-4">
                <p className="bg-violet-700 font-bold text-white py-2 px-4">All Products</p>
                <div className="px-4 py-5">
                    <div className="w-full md:w-80">
                        <InputSearch setSearchValue={setSearchValue} />
                    </div>

                    {
                       <ProductTable products={products?.data} productMutate={productMutate} />
                    }

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={products?.totalPages} />
                </div>
            </div>
        </section>
    );
};

export default ProductPage;