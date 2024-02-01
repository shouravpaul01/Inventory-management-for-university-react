import generateTotalPaginatePages from "../../utils/generateTotalPaginatePages";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";


const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    
    return (
        <div className="flex  gap-3 p-2">
            <button onClick={() => setCurrentPage(currentPage - 1)} className="btn btn-sm btn-circle btn-primary" disabled={currentPage === 1}><MdKeyboardDoubleArrowLeft /></button>
            <ul className="flex flex-wrap gap-2">
                {

                    generateTotalPaginatePages(totalPages || 8)?.map((pageNo, index) => <li key={index + 1} className={`btn btn-sm btn-circle ${currentPage==pageNo?"btn-primary":"btn-outline btn-primary"} `} onClick={()=>{setCurrentPage(pageNo)}} >{pageNo}</li>)
                }

            </ul>
            <button onClick={() => setCurrentPage(currentPage + 1)} className="btn btn-sm btn-circle btn-primary" disabled={currentPage === totalPages}><MdKeyboardDoubleArrowRight /></button>
        </div>
    );
};

export default Pagination;