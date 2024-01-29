import { TfiFaceSad } from "react-icons/tfi";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className='min-h-screen flex flex-col gap-2 items-center justify-center'>
                <TfiFaceSad  className="text-7xl animate-bounce"/>
                <p className="text-3xl font-semibold">Not Found</p>
                <Link to={'/'} className="btn btn-sm btn-outline btn-primary rounded-full">Go to Home</Link>
        </div>
    );
};

export default ErrorPage;