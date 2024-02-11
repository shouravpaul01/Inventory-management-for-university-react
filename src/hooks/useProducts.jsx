import useSWR from "swr";
import axiosInstance from "../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)

const useProducts = (currentPage,searchValue) => {
    const { data: products = [], mutate: productMutate, isLoading } = useSWR(`/product?page=${currentPage}&search=${searchValue}`, fetcher)
    return {products,productMutate,isLoading}
};

export default useProducts;