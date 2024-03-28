import useSWR from "swr";
import axiosInstance from "../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)

const useAccessories = (currentPage,searchValue,filterByDate) => {
    const { data: accessories = [], mutate: accessoriesMutate, isLoading } = useSWR(`/accessory?page=${currentPage}&search=${searchValue}&filterByDate=${JSON.stringify(filterByDate)}`, fetcher)
    return {accessories,accessoriesMutate,isLoading}
};

export default useAccessories;