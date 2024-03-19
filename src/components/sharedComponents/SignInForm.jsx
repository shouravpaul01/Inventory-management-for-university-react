import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaRegCircleXmark, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../../axios.config";

const SignInForm = () => {
    const [signInError,setSignInError]=useState(null)
    const { register, handleSubmit, reset,  formState: { errors } } = useForm()
    const [showPassword,setShowPassword]=useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const currentLocation = location?.state?.from?.pathname || '/'
    console.log(currentLocation);
    
    const handleSignIn = (data) => {
        const {email,password}=data
        axiosInstance.get(`/user/check-approve-user?email=${email}`).then(res=>{
            if(res.status==200){
                signIn(email,password)
                .then(()=>{
                   navigate(currentLocation,{replace:true})
                   toast.success('Successfully Sign in.')
                   reset()
                   setSignInError(null)
                })
                .catch((err) => {
                    setSignInError('Invalid User.')
                    console.log(err.message);
                  });
            }else if(res.status==201){
                
                setSignInError(res.data.error)

            }
        })
        
    }

    return (
        <div>
            <p className="text-lg font-bold text-indigo-400 text-center border-b">Sign In</p>
            {
                signInError && <div className="flex items-center text-lg text-red-500">
                    <p className="grow">{signInError} </p>
                <span onClick={()=>setSignInError(null)}><FaRegCircleXmark /></span>
                </div>
            }
            <form onSubmit={handleSubmit(handleSignIn)}>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" {...register('email', { required: "The field is required" })} placeholder="Email" className="input input-sm input-bordered focus:outline-none focus:border-primary w-full " />
                    {errors?.email && <p className="text-red-400">{errors.email.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered focus-within:outline-none focus-within:border-primary w-full ">
                    <input type={`${showPassword?"text":"password"}`} {...register('password', { required: "The field is required" })} placeholder=" Password" className="flex-grow" />
                         <Link className="flex items-center" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaRegEye />:<FaRegEyeSlash />}</Link>
                    </div>
                    {errors?.password && <p className="text-red-400">{errors.password.message}</p>}
                </label>
                <button type="submit" className="btn btn-sm btn-primary rounded-full w-full mt-3"> <FaArrowRight /> Sing in</button>
            </form>
        </div>
    );
};

export default SignInForm;