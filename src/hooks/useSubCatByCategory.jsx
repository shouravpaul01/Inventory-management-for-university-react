import useSWR from "swr";
import axiosInstance from "../../axios.config";

const fetcher = url => axiosInstance.get(url).then(res => res.data)
const useSubCatByCategory = (categoryId) => {
    const { data: subCategories = [],mutate:subCatMutate} = useSWR(`/sub-cat/matched-by-category?category=${categoryId}`, fetcher)
return {subCategories,subCatMutate}
};

export default useSubCatByCategory;