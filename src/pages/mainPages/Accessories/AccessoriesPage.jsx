import { useState } from "react";
import { FaCircleInfo, } from "react-icons/fa6";
import useCategories from "../../../hooks/useCategories";
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";
import CardAccessories from "../../../components/mainComponents/CardAccessories";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../components/sharedComponents/Pagination";
import Loading from "../../../components/sharedComponents/Loading";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const AccessoriesPage = () => {
    const { categories } = useCategories()
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [resturnStatus, setReturnStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(4)
    const [selectedTotalAccessories, setSelectedTotalAccessories] = useState([])

    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('search') || '';
    const resturnStatusOptions = [
        { value: 'Yes' },
        { value: 'No' }
    ]
    const { data: products = [], isLoading } = useSWR(`/product/all-active-product?search=${searchValue}&currentPage=${currentPage}&pageSize=${pageSize}&categories=${selectedCategories}&subCategories=${selectedSubCategories}&returnStatus=${resturnStatus}`, fetcher)
    console.log(products?.data?.length);
    const handleSelectedCategory = (_id) => {
        const contentId = document.getElementById(`${_id}`)
        const filterCategory = selectedCategories.filter(category => category !== _id)
        if (selectedCategories.includes(_id)) {
            if (contentId) {
                contentId.classList.add('hidden')
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

    // console.log(categories);
    return (
        <section className="my-container py-12">
            <div className="flex flex-col md:flex-row gap-5">
                <div className="basis-3/12 ">
                    <p className="bg-violet-700 font-bold text-xl text-white rounded-sm py-2 px-5 mb-3">Select Types</p>
                    <div>
                        {
                            categories?.data?.map((category, index) => <div key={index} className="form-control ">
                                <label className="label justify-normal cursor-pointer border-b">
                                    <input type="checkbox" onClick={() => { handleSelectedCategory(category._id) }} className="checkbox  checkbox-primary" />
                                    <span className="ps-4">{category?.name}</span>
                                </label>
                                <div id={`${category._id}`} className="hidden">
                                    {
                                        category?.subcategories?.map((subCategory, index) => <div key={index} className=" ps-5 border-b">
                                            <label className="label justify-normal cursor-pointer">
                                                <input type="checkbox" onClick={() => handleSelectedSubCategory(subCategory._id)} className="checkbox  checkbox-primary" />
                                                <span className="ps-4">{subCategory?.name}</span>
                                            </label>
                                        </div>)
                                    }
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div className="basis-9/12">
                    {/* <p className="bg-violet-700 font-bold text-xl text-white rounded-sm py-2 px-5">Select Accessories</p> */}
                    <div className="border-b pb-2  text-end">
                        <div className="">
                            <label >Filter By: </label>
                            <select value={resturnStatus} onChange={(e) => setReturnStatus(e.target.value)} className="select select-bordered focus:outline-none min-h-8 h-8 w-full max-w-36">
                                <option disabled  value='' >--Select Return Status--</option>
                                {
                                    resturnStatusOptions?.map((returnStatus, index) => <option key={index} value={returnStatus.value}>{returnStatus.value}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    {
                        isLoading ? <><Loading /></> : <>{

                            products?.data?.length > 0 ? <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                                {
                                    products.data?.map((product, index) => <CardAccessories key={index} product={product} selectedTotalAccessories={selectedTotalAccessories}  setSelectedTotalAccessories={setSelectedTotalAccessories} />)
                                }
                            </div> : <div role="alert" className="pt-4 flex items-center justify-center gap-5 text-lg">
                                <FaCircleInfo />
                                <span>Data not found.</span>

                            </div>
                        }
                            <div className="pt-4">
                                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={products?.totalPages} />
                            </div>
                        </>
                    }
                </div>
            </div>

        </section>
    );
};

export default AccessoriesPage;