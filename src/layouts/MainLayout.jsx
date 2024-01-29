import { Outlet } from "react-router-dom";
import Header from "../components/mainComponents/Header";
import Footer from "../components/mainComponents/Footer";


const MainLayout = () => {
    return (
        <>
           <Header/>
           <Outlet/>
           <Footer/> 
        </>
    );
};

export default MainLayout;