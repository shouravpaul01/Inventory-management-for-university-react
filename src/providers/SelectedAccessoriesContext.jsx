import { Children, createContext, useState } from "react";


const SelectedAccessoriesContext = ({children}) => {
    const SelectedAccessoriesContext=createContext()
    const [selectedTotalAccessories, setSelectedTotalAccessories] = useState([])
    return (
        <SelectedAccessoriesContext.Provider value={{selectedTotalAccessories, setSelectedTotalAccessories}}>
            {children}
        </SelectedAccessoriesContext.Provider>
    );
};

export default SelectedAccessoriesContext;