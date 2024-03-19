import { FaArrowsDownToPeople, FaCubesStacked, FaGrip } from "react-icons/fa6";


const HomeDashboard = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-5 md:px-0">
            <div className="bg-lime-200 rounded-md shadow-xl shadow-gray-300 p-4">
                <div className="flex items-center pb-2">
                <p className="grow font-bold text-lg">Total Roles</p>
                <span className="badge badge-secondary">5</span>
                </div>
                <span className="text-xl md:text-3xl"><FaArrowsDownToPeople /></span>
            </div>
            <div className="bg-red-200 rounded-md shadow-xl shadow-gray-300 p-4">
                <div className="flex items-center pb-2">
                <p className="grow font-bold text-lg">Total Category</p>
                <span className="badge badge-secondary">5</span>
                </div>
                <span className="text-xl md:text-3xl"><FaGrip /></span>
            </div>
            <div className="bg-green-300 rounded-md shadow-xl shadow-gray-300 p-4">
                <div className="flex items-center pb-2">
                <p className="grow font-bold text-lg">Total Accessories</p>
                <span className="badge badge-secondary">5</span>
                </div>
                <span className="text-xl md:text-3xl"><FaCubesStacked /></span>
            </div>
        </div>
    );
};

export default HomeDashboard;