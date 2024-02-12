import SelectedAccessoriesContext from "./SelectedAccessoriesContext";


const Provider = ({children}) => {
    return (
        <SelectedAccessoriesContext>
            {children}
        </SelectedAccessoriesContext>
    );
};

export default Provider;