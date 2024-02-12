import { useState } from 'react';
import SelectedAccessoriesContext from '../contexts/SelectedAccessoriesContext';


const SelectedAccessoriesProvider = ({ children }) => {

    const [selectedTotalAccessories, setSelectedTotalAccessories] = useState([])

    return (
        <SelectedAccessoriesContext.Provider value={{ selectedTotalAccessories, setSelectedTotalAccessories }}>
            {children}
        </SelectedAccessoriesContext.Provider>
    );

};

export default SelectedAccessoriesProvider;