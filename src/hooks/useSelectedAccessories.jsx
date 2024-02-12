import { useEffect, useState } from "react";


const useSelectedAccessories = () => {
    const [selectedTotalAccessories, setSelectedTotalAccessories] = useState([])
    console.log(selectedTotalAccessories,'1');
    useEffect(()=>{

    },[selectedTotalAccessories])
    
    return [selectedTotalAccessories, setSelectedTotalAccessories]
};

export default useSelectedAccessories;