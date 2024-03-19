import useSWR from "swr";
import axiosInstance from "../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)

const useAccessories = (currentPage,searchValue) => {
    const { data: accessories = [], mutate: accessoriesMutate, isLoading } = useSWR(`/accessory?page=${currentPage}&search=${searchValue}`, fetcher)
    return {accessories,accessoriesMutate,isLoading}
};

export default useAccessories;