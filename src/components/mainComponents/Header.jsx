import { Link, NavLink, useNavigate } from "react-router-dom";
import { LiaFaxSolid } from "react-icons/lia";
import { FiMail } from "react-icons/fi";
import { AiOutlinePhone } from "react-icons/ai";
import { FaAngleDown, FaAngleUp, FaArrowRightFromBracket, FaBars, FaCartFlatbedSuitcase, FaHouse, FaPhone, FaUserShield } from "react-icons/fa6";
import { useEffect, useState } from "react";
import julogo from '../../assets/Images/ju-logo.png'
import InputSearch from "../sharedComponents/InputSearch";
import useSelectedAccessories from "../../hooks/useSelectedAccessories";
import useAuth from "../../hooks/useAuth";


const Header = () => {
   
    const candidateUser = null
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const {selectedTotalAccessories }=useSelectedAccessories()


    useEffect(() => {
        // Navigate accessories page when product is search  
        if (searchValue) {
            navigate(`/accessories?search=${searchValue}`)
        }
        if (!searchValue) {
            navigate(`/accessories`)
        }
        console.log('header');
    }, [searchValue])
   
    const { user, logout, loading } = useAuth()
    // const { candidateUser } = useCandidateUser()


    // Sidebar hide when  Mobile menu item click
    const handleSidebarClose = () => {
        document.getElementById('my-drawer-3').checked = false
    }

    const handleLogout = () => {
        logout()
            .then(() => {
                Cookies.remove('BD-Tech-Solution')
                // localStorage.removeItem('BD-Tech-Solution')
            })
            .catch((error) => console.log(error))
    };

    const beforeSignInNavLink = <>
        <li><NavLink to={'/signin-up'} className={({ isActive }) => isActive ? 'active-link-signin' : 'flex items-center'} onClick={() => handleSidebarClose()}><FaUserShield /> Singin/Up</NavLink></li>
    </>

    const afterSignInNavLink = <>
        <li>
            <div className="dropdown dropdown-bottom dropdown-end ">
                <label tabIndex={0} onClick={() => setIsOpenDropdown(!isOpenDropdown)} className={`flex items-center  justify-center gap-8 border border-indigo-700 rounded-full p-[3px] ${isOpenDropdown ? 'bg-primary text-white' : ''}`}>
                    <div className="avatar">
                        <div className="w-7 rounded-full">
                            <img src={''} alt="profile" width={28} height={28} />
                        </div>
                    </div>
                    <span className="pe-1">{isOpenDropdown ? <FaAngleDown /> : <FaAngleUp />}</span></label>
                {
                    isOpenDropdown && <ul tabIndex={0} onClick={() => setIsOpenDropdown(!isOpenDropdown)} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 border-e border-indigo-400 animate-custom mt-3 w-52 ">
                        <li><NavLink to={`${candidateUser ? '/user/setting' : 'dashboard'}`} className={({ isActive }) => isActive ? 'active-link' : ''}><FaHouse /> Dashboard</NavLink></li>
                        <li>
                            <button onClick={() => handleLogout()} className="flex items-center space-x-2px-4"><FaArrowRightFromBracket /><span>Logout</span>
                            </button>
                        </li>
                    </ul>
                }
            </div>
        </li>
    </>

    const authNav = user ? afterSignInNavLink : beforeSignInNavLink;


    const leftSideNav = <div className="flex-none "><ul className="flex items-center justify-center ">
        <li className="nav"><NavLink to={'/'} className={({ isActive }) => isActive ? 'nav-item nav-active-link ' : 'nav-item '} onClick={() => handleSidebarClose()}>Home</NavLink></li>
        <li><Link to={'/accessories'} className={({ isActive }) => isActive ? 'nav-item nav-active-link ' : 'nav-item '}>accessorie</Link></li>
        <li><Link to={'/contact'} className={({ isActive }) => isActive ? 'nav-item nav-active-link ' : 'nav-item '}>Contact</Link></li>
    </ul></div>
    const rightSideNav = <div className="flex-none ">
        <ul className="flex items-center  gap-4">
            <li><InputSearch setSearchValue={setSearchValue} classNameSearch={'rounded-full   focus:outline-violet-600 '} classNameSearchBtn={'rounded-e-full  p-1 text-violet-600'} /></li>
            {
                authNav
            }
            <li className="flex items-center justify-center"><NavLink to={'/confirm-accessories'} className="indicator" >

                <span className="indicator-item text-red-400">{selectedTotalAccessories?.length}</span>
                <div className="text-lg text-white"><FaCartFlatbedSuitcase /></div>
            </NavLink></li>
        </ul>
    </div>


    return (
        <>
            <header className=" my-container ">
                <div className="md:flex flex-col gap-3 hidden  mb-3">
                    <div className="bg-slate-200 flex justify-end gap-4 w-full">
                        <p className="flex items-center gap-1"><AiOutlinePhone /> 02224491045-51</p>
                        <p className="flex items-center gap-1"><LiaFaxSolid /> Fax: 02224491052 </p>
                        <p className="flex items-center gap-1 pe-3"><FiMail /> registrar@juniv.edu</p>
                    </div>
                    <div className="flex  justify-center gap-4">
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
                <div className="drawer">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* Navbar */}
                        <div className=" navbar justify-normal min-h-[40px] md:bg-violet-700 pt-2 md:py-0  px-0 border-b border-violet-800  ">
                            {/* <div className="flex-none ps-2 pe-6 lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" >
                                    <FaBars className="text-xl" />
                                </label>
                            </div> */}

                            {/* <div className="flex gap-2 md:gap-4 md:hidden">
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
                                </div> */}


                            <div className="md:flex justify-between  hidden w-full px-3 ">

                                {/* Navbar menu content here */}
                                {leftSideNav}
                                {rightSideNav}

                            </div>
                        </div>

                    </div>
                    {/* Mobile menu */}
                    <div className="drawer-side z-50 md:hidden">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="flex flex-col gap-3 p-4 w-80 min-h-full bg-base-200">
                            {/* Sidebar content here */}
                            <div>
                                <Link to={'/'} className="flex items-center justify-center gap-3 mt-8 mb-6" onClick={() => handleSidebarClose()}>
                                    <img src={''} alt="logo" className="w-10 h-10" />
                                    <p className="text-xl md:text-2xl font-bold "><span className="text-green-500">BD</span>-TECH Solution</p>
                                </Link>
                            </div>
                            {leftSideNav}
                            {rightSideNav}
                        </ul>
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;