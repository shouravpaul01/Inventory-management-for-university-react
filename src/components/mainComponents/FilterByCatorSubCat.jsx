

const FilterByCatorSubCat = ({ categories, handleSelectedCategory, handleSelectedSubCategory }) => {
    return (
        <>
            {
                categories?.data?.map((category, index) => <div key={index} className="form-control ">
                    <label className="label justify-normal cursor-pointer border-b">
                        <input type="checkbox" onClick={() => { handleSelectedCategory(category._id) }} className="checkbox checkbox-sm checkbox-primary" />
                        <span className="ps-4">{category?.name}</span>
                    </label>
                    <div id={`${category._id}`} className="hidden">
                        {
                            category?.subcategories?.map((subCategory, index) => <div key={index} className=" ps-5 border-b">
                                <label className="label justify-normal cursor-pointer">
                                    <input type="checkbox"  onClick={() => handleSelectedSubCategory(subCategory._id)} className="checkbox checkbox-sm checkbox-primary" />
                                    <span className="ps-4">{subCategory?.name}</span>
                                </label>
                            </div>)
                        }
                    </div>
                </div>)
            }
        </>
    );
};

export default FilterByCatorSubCat;