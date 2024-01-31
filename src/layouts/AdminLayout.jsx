import { FaArrowRightFromBracket, FaBars } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import julogo from '../assets/Images/ju-logo.png'

const AdminLayout = () => {
    const handleLogout = () => {

    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                <div className="navbar sticky top-0  lg:hidden border-b border-violet-700">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button ">
                            <FaBars className="text-xl" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-2 md:gap-4 md:hidden">
                            <div className='relative '>
                                <div className='w-20 h-20 md:w-24 md:h-24 border-2 border-dotted border-violet-800 rounded-full animate-spin p-4'>
                                </div>
                                <img src={julogo} className='w-14 md:w-16 absolute top-2 left-3 md:left-4 opacity-85' alt="ju-logo" />
                            </div>
                            <div className="flex items-end ">
                                <div className="pb-3 font-bold ">
                                    <p className="text-xl md:text-2xl text-violet-800">Jahangirnagar University</p>
                                    <p className="">Inventory Management</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-2 md:mx-10 my-12">
                    {/* Page content here */}
                    <Outlet />
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />

                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="min-h-full  w-80  bg-gray-100  relative">
                    <div className="flex flex-col items-center gap-2 border-b p-4 mb-4">
                        <div className='relative '>
                            <div className='w-20 h-20 md:w-24 md:h-24 border-2 border-dotted border-violet-800 rounded-full animate-spin p-4'>
                            </div>
                            <img src={julogo} className='w-14 md:w-16 absolute top-2 left-3 md:left-4 opacity-85' alt="ju-logo" />
                        </div>

                        <div className="text-center pb-3 font-bold ">
                            <p className="text-xl md:text-2xl text-violet-800">Jahangirnagar University</p>
                            <p className="">Inventory Management</p>
                        </div>

                    </div>
                    <div className="h-80 overflow-y-auto">
                        <ul className="menu-item ">

                            {/* Sidebar content here */}
                            <li><NavLink to={"/dashboard"} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Dashboard</NavLink></li>
                            <li><NavLink to={'/dashboard/all-user'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Users</NavLink></li>
                            <li><NavLink to={'/dashboard/movies'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Movies</NavLink></li>
                            <li><NavLink to={'/dashboard/shows'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Movie Shows</NavLink></li>
                            <li><NavLink to={'/dashboard/all-booking'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Booking</NavLink></li>


                        </ul>
                    </div>

                    <div className=" absolute bottom-0 left-0 right-0">
                        <Link className="flex items-center gap-3  py-4 px-5"><FaArrowRightFromBracket /> Logout</Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AdminLayout;