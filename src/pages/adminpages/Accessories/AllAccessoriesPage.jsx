import InputSearch from '../../../components/sharedComponents/InputSearch';
import Pagination from '../../../components/sharedComponents/Pagination';
import { useState } from 'react';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import Loading from '../../../components/sharedComponents/Loading';
import useAccessories from '../../../hooks/useAccessories';
import AccessoriesTable from '../../../components/adminComponents/AccessoriesTable';
import AccessoryForm from '../../../components/adminComponents/AccessoryForm';
import FilterByDate from '../../../components/sharedComponents/FilterByDate';

const AllAccessoriesPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [contentHide, setContentHide] = useState(false)
    const [filterByDate, setFilterByDate] = useState(null)

    const { accessories,accessoriesMutate, isLoading } = useAccessories(currentPage, searchValue,filterByDate)
    console.log(accessories.data);
    return (
        <section >
            {
                contentHide && <div className="bg-gray-100 ">
                    <div className='flex items-center bg-violet-700 py-2 px-4'>

                        <p className="font-bold text-white flex-1">Add Product</p>
                        <button onClick={() => setContentHide(!contentHide)} className={`btn btn-sm btn-circle  ${contentHide?'btn-error':'btn-info'}`}>{contentHide?<FaXmark />:<FaPlus />} </button>
                    </div>

                    <div className=' transition duration-500 '>
                        <AccessoryForm mutate={accessoriesMutate} />
                    </div>



                </div>
            }
            <div className="bg-gray-100 mt-4">
                <div className='flex items-center bg-violet-700 py-2 px-4'>

                    <p className="font-bold text-white flex-1">All Products</p>
                    <button onClick={() => setContentHide(!contentHide)} className={`btn btn-sm btn-circle ${contentHide?'btn-error':' btn-info'}`}>{contentHide?<FaXmark />:<FaPlus />} </button>
                </div>
                {/* <p className="bg-violet-700 font-bold text-white py-2 px-4">All Products</p> */}
                <div className="px-4 py-5">



                <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between">
                        <div className="w-full md:w-80">
                            <InputSearch setSearchValue={setSearchValue} classNameSearch={' border border-violet-400 rounded-full py-1   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} />
                        </div>
                        <FilterByDate setFilterByDate={setFilterByDate} />
                    </div>
                    {
                        isLoading ? <Loading /> : <AccessoriesTable accessories={accessories?.data} mutate={accessoriesMutate} />
                    }


                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={accessories?.totalPages} />



                </div>
            </div>
        </section>
    );
};

export default AllAccessoriesPage;