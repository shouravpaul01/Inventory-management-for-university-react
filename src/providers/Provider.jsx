import SelectedAccessoriesProvider from "./SelectedAccessoriesProvider";


const Provider = ({children}) => {
    return (
        <SelectedAccessoriesProvider>
            {children}
        </SelectedAccessoriesProvider>
    );
};

export default Provider;