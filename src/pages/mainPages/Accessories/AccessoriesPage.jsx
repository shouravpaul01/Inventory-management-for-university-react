import { useState } from "react";
import { FaBars, FaCircleInfo, } from "react-icons/fa6";
import useCategories from "../../../hooks/useCategories";
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";
import CardAccessories from "../../../components/mainComponents/CardAccessories";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/sharedComponents/Pagination";
import Loading from "../../../components/sharedComponents/Loading";
import useSelectedAccessories from "../../../hooks/useSelectedAccessories";
import FilterByCatorSubCat from "../../../components/mainComponents/FilterByCatorSubCat";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const AccessoriesPage = () => {
    const { categories } = useCategories()
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [resturnStatus, setisItReturnable] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const { selectedTotalAccessories, setSelectedTotalAccessories } = useSelectedAccessories()

    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('search') || '';
    const resturnStatusOptions = [
        { value: '', label: 'All' },
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' }
    ]

    const { data: accessories = [], isLoading } = useSWR(`/accessory/all-active-product?search=${searchValue}&currentPage=${currentPage}&pageSize=${pageSize}&categories=${selectedCategories}&subCategories=${selectedSubCategories}&isItReturnable=${resturnStatus}`, fetcher)
console.log(accessories,'accessories');
    const handleSelectedCategory = (_id) => {
        const contentId = document.getElementById(`${_id}`)
        const filterCategory = selectedCategories.filter(category => category !== _id)
        if (selectedCategories.includes(_id)) {
            if (contentId) {
                contentId.classList.add('hidden')
                contentId.checked = false

            }
            setSelectedCategories(filterCategory)
        } else {
            if (contentId) {
                contentId.classList.remove('hidden')

            }

            setSelectedCategories([...selectedCategories, _id])
        }
    }

    const handleSelectedSubCategory = (_id) => {
        const filterCategory = selectedSubCategories.filter(category => category !== _id)
        if (selectedSubCategories.includes(_id)) {
            setSelectedSubCategories(filterCategory)
        } else {
            setSelectedSubCategories([...selectedSubCategories, _id])
        }
    }


    const handleSelectAccessory = (accessory, plusMinusValue) => {
        console.log(accessory, '3')
        const findAccessory = selectedTotalAccessories?.find(item => item._id == accessory._id)
        if (findAccessory) {
            return
        }

        const data = { _id: accessory?._id, name: accessory?.name, image: accessory?.image?.url, isItReturnable: accessory?.isItReturnable, currentQuantity: accessory?.currentQuantity,allCode:accessory.quantityDetails.allCode }
        data.quantity = plusMinusValue
        data.isChecked = true
        //    console.log(data);
        setSelectedTotalAccessories([...selectedTotalAccessories, data])

    }
    console.log(selectedCategories, selectedSubCategories);
    return (
        <>
            <section className="my-container py-12">
                <div className="flex  gap-5">
                    <div className="basis-3/12 hidden md:flex flex-col">
                        <p className="bg-violet-700 font-bold text-xl text-white rounded-sm py-2 px-5 mb-3">Select Types</p>
                        <div>
                            <FilterByCatorSubCat categories={categories} selectedCategories={selectedCategories} handleSelectedCategory={handleSelectedCategory} selectedSubCategories={selectedSubCategories} handleSelectedSubCategory={handleSelectedSubCategory} />

                        </div>
                    </div>
                    <div className="w-full md:basis-9/12">
                        {/* <p className="bg-violet-700 font-bold text-xl text-white rounded-sm py-2 px-5">Select Accessories</p> */}
                        <div className="flex items-center  justify-between border-b pb-2  ">
                            <div className="dropdown dropdown-bottom">


                                <label tabIndex={0} role="button" className="drawer-button  flex md:hidden items-center gap-2"><FaBars /> Categories</label>
                                <div tabIndex={0} className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-52">
                                    <FilterByCatorSubCat categories={categories} selectedCategories={selectedCategories} handleSelectedCategory={handleSelectedCategory} selectedSubCategories={selectedSubCategories} handleSelectedSubCategory={handleSelectedSubCategory} />
                                </div>
                            </div>
                            <div className=" md:text-end md:w-full">
                                <label >Filter By: </label>
                                <select value={resturnStatus} onChange={(e) => setisItReturnable(e.target.value)} className="select select-bordered focus:outline-none focus:border-primary min-h-8 h-8  max-w-36">
                                    <option disabled value='' >--Select Return Status--</option>
                                    {
                                        resturnStatusOptions?.map((isItReturnable, index) => <option key={index} value={isItReturnable.value}>{isItReturnable.label}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        {
                            isLoading ? <Loading /> : <>{

                                accessories?.data?.length > 0 ? <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {
                                        accessories.data?.map((accessory, index) => <CardAccessories key={index} accessory={accessory} handleSelectAccessory={handleSelectAccessory} />)
                                    }
                                </div> : <div role="alert" className="pt-4 flex items-center justify-center gap-5 text-lg">
                                    <FaCircleInfo />
                                    <span>Data not found.</span>

                                </div>
                            }
                                <div className="pt-4">
                                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={accessories?.totalPages} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </section>

        </>
    );
};

export default AccessoriesPage;