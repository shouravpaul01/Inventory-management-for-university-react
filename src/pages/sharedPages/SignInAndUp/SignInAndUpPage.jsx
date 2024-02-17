import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "../../../components/sharedComponents/SignInForm";
import SignUpForm from "../../../components/sharedComponents/SignUpForm";
import julogo from '../../../assets/Images/ju-logo.png'

const SignInAndUpPage = () => {
    const [tabActive, setTabActive] = useState('signin')
    // const history = useHistory();
    // console.log(history);
    // useEffect(()=>{

    // },[])
    // const {user}=useAuth()
    // //the not showing if user sign in
    // if (user) {
    //    return <Navigate to={'/'}/>
    // }
    return (
        <section className="my-container     ">
            
            <div className="min-h-screen  flex items-center justify-center flex-col md:flex-row">
                <div className="basis-1/2 flex  justify-center items-center">
                    <div>
                        <div className="flex flex-col items-center justify-center  gap-4">
                            <div className='relative '>
                                <div className='w-28 h-28  border-2 border-dashed border-violet-800 rounded-full animate-spin p-4'>
                                </div>
                                <img src={julogo} className='w-20  absolute top-2 left-4  opacity-85' alt="ju-logo" />
                            </div>

                            <div className="pb-3 font-bold text-center">
                                <p className="text-xl md:text-2xl text-violet-800">Jahangirnagar University</p>
                                <p className="">Inventory Management</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="basis-1/2">
                    <div className="bg-white rounded-md w-full md:w-[400px] relative">

                        <div role="tablist" className="tabs  rounded-t-md">
                            <Link role="tab" className={`tab rounded-tl-lg ${tabActive === 'signin' ? 'bg-indigo-500 text-white' : 'bg-slate-200'}`} onClick={() => setTabActive('signin')}>Login</Link>
                            <Link role="tab" className={`tab rounded-tr-lg ${tabActive === 'signup' ? 'bg-indigo-500 text-white' : 'bg-slate-200'}`} onClick={() => setTabActive('signup')}>Register</Link>
                        </div>
                        <div className="px-4 py-5">
                            {
                                tabActive == 'signin' && <SignInForm />
                            }
                            {

                                tabActive == 'signup' && <SignUpForm />

                            }
                        </div>


                    </div>
                </div>
            </div>
           

        </section>
    );
};

export default SignInAndUpPage;