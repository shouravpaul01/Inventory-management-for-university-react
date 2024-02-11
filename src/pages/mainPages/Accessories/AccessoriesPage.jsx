import { useEffect, useState } from "react";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa6";
import useCategories from "../../../hooks/useCategories";
import useSubCatByCategory from "../../../hooks/useSubCatByCategory";
import useSWR from "swr";
import axiosInstance from "../../../../axios.config";
import { set } from "react-hook-form";
import CardAccessories from "../../../components/sharedComponents/CardAccessories";
import useProducts from "../../../hooks/useProducts";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const AccessoriesPage = () => {
    const [isDropdown, setIsDropDown] = useState('')
    const { categories } = useCategories()
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    //     const catArray =  selectedCategories.map((value) => `${value}`).join(',');
    //    const subCatArray=selectedSubCategories.map((value) => `${value}`).join(',');
    const { data: products = [] } = useSWR(`/product/all-active-product?categories=${selectedCategories}&subCategories=${selectedSubCategories}`, fetcher)

    const handleSelectedCategory = (_id) => {
        const contentId = document.getElementById(`${_id}`)
        const filterCategory = selectedCategories.filter(category => category !== _id)
        if (selectedCategories.includes(_id)) {
            if (contentId) {
                contentId.classList.add('hidden')
            }
            setSelectedCategories(filterCategory)
        } else {
            console.log(_id);
            
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
            <div className="flex gap-5">
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
                                        category?.subcategories?.map((subCategory, index) => <div key={index}  className=" ps-5 border-b">
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
                    <p className="bg-violet-700 font-bold text-xl text-white rounded-sm py-2 px-5">Select Accessories</p>
                    <div className="py-7 grid grid-cols-4 gap-6">
                        {
                            products.data?.map((product, index) => <CardAccessories product={product} key={index} />)
                        }
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AccessoriesPage;