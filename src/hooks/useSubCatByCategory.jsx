import useSWR from "swr";
import axiosInstance from "../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const useSubCatByCategory = (categoryId) => {
    const { data: subCategories = []} = useSWR(`/sub-cat/matched-by-category?category=${categoryId}`, fetcher)
    return {subCategories}
};

export default useSubCatByCategory;