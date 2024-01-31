import { FaArrowRight } from "react-icons/fa6";
const AccessoriesPage = () => {
    return (
        <section className="my-container py-12">
            <div className="flex gap-5">
                <div className="basis-3/12 ">
                    <p className="bg-violet-700 font-bold text-xl text-white rounded-sm py-2 px-5 mb-3">Select Types</p>
                    <div className="space-y-1">
                    <div className="collapse collapse-arrow rounded-none bg-base-200 pb-0">
                        <input type="radio" name="my-accordion-2" checked="checked" />
                        <div className="collapse-title text-xl font-medium">
                            Electronics
                        </div>
                        <div className="p-0 collapse-content bg-red-50 ">

                            <p className="ps-5 py-2 bg-violet-700">hello</p>
                            <p className="flex items-center gap-2 ps-5 py-2 bg-violet-700 text-white"><FaArrowRight /> hello</p>

                        </div>
                    </div>
                    <div className="collapse collapse-arrow rounded-none bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Futnitures
                        </div>
                        
                    </div>
                    <div className="collapse collapse-arrow rounded-none bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">
                            Shourav
                        </div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="basis-9/12">
                    <p className="bg-violet-700 font-bold text-xl text-white rounded-sm py-2 px-5">Select Accessories</p>
                </div>
            </div>

        </section>
    );
};

export default AccessoriesPage;