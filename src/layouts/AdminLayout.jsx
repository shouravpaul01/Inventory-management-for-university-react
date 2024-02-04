import { FaArrowRightFromBracket, FaBars } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";

import julogo from '../assets/Images/ju-logo.png'
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
    const handleLogout = () => {

    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content md:px-3">
                {/* Page content here */}
                <div className="navbar min-h-[40px]  md:bg-gray-100 md:rounded-md md:mt-5 md:py-0  border-b md:border-none border-violet-700">
                    <div className="flex-1 ">
                        <label htmlFor="my-drawer-2" className="flex md:hidden btn btn-square btn-ghost drawer-button ">
                            <FaBars className="text-xl" />
                        </label>
                        <p className="font-bold text-xl  md:flex hidden">Inventory management</p>
                    </div>

                    {/* This Content hidden when screen size is 480px */}
                    <div className="flex-none">
                        <div className="flex gap-2 md:hidden">
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
                    <div className="flex-none">
                        <div className="md:flex justify-end hidden">
                            <div className="dropdown dropdown-end ">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 h-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="mx-0 md:mx-10 my-12">
                    {/* Page content here */}

                    <Outlet />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"/>

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
                            <li><NavLink to={'/dashboard/category'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Category</NavLink></li>
                            <li><NavLink to={'/dashboard/sub-category'} className={({ isActive }) => isActive ? "menu-item-active" : ""}>Sub Category</NavLink></li>
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