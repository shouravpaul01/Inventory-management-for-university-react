import { Outlet } from "react-router-dom";
import Header from "../components/mainComponents/Header";
import Footer from "../components/mainComponents/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const MainLayout = () => {
    return (
        <>
           <Header/>
           <Outlet/>
           <Footer/> 
           <ToastContainer />
        </>
    );
};

export default MainLayout;