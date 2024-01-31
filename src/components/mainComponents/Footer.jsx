import { FaFacebookF, FaTwitter, FaXTwitter } from 'react-icons/fa6';
import julogo from '../../assets/Images/ju-logo.png'

const Footer = () => {
    return (
        <footer className="border-t border-dashed border-violet-900 pb-2">
            <div className='bg-base-200 '>
                <div className="my-container footer p-10">
                    <aside>
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
                        <div className='flex justify-center mx-auto gap-2'>
                            <a href="http://" className='text-white text-xl' target="_blank" rel="noopener noreferrer"><p className='bg-blue-500 rounded-full p-2'><FaFacebookF /></p></a>
                            <a href="http://" className='text-white text-xl' target="_blank" rel="noopener noreferrer"><p className='bg-black rounded-full p-2'><FaXTwitter /></p></a>
                        </div>
                    </aside>
                    <nav>
                        <header className="footer-title">Services</header>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Company</header>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <header className="footer-title">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </div>
            </div>
            <div className="bg-violet-900 p-4 text-white text-opacity-50 text-center">
                <p>Copyright © -Jahangirnagar University</p>
            </div>
        </footer>

    );
};

export default Footer;