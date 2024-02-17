import AuthProvider from "./AuthProvider";
import SelectedAccessoriesProvider from "./SelectedAccessoriesProvider";


const Provider = ({ children }) => {
    return (
        <AuthProvider>
            <SelectedAccessoriesProvider>
                {children}
            </SelectedAccessoriesProvider>
        </AuthProvider>
    );
};

export default Provider;