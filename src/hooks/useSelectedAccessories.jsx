import { useContext } from "react";
import SelectedAccessoriesContext from "../contexts/SelectedAccessoriesContext";



const useSelectedAccessories = () => {
    return useContext(SelectedAccessoriesContext);
    
     
};

export default useSelectedAccessories;