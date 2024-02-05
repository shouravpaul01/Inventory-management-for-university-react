import useSWR from "swr";
import axiosInstance from "../../axios.config";


const useCategories = (currentPage,searchValue) => {
    const fetcher = url => axiosInstance.get(url).then(res => res.data)
    const { data: categories = [], mutate, isLoading } = useSWR(searchValue?`/category?page=${currentPage}&search=${searchValue}`:'/category', fetcher)
    return {categories,mutate,isLoading}
};

export default useCategories;