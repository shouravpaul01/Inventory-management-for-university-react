import { FaArrowRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../axios.config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import roomDataJson from '../../JsonData/RoomNO.json'


const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, reset, control, watch, setValue, setError, formState: { errors } } = useForm()
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const currentLocation = location?.state?.from?.pathname || '/'
    const professions=[
        {value:'Teacher',label:'Teacter'},
        {value:'Librarian',label:'Librarian'},
        {value:'Lab Assistant',label:'Lab Assistant'},
    ]

    const handleSignUp = (data) => {
        signUp(data.email, data.password)
            .then(() => {
                axiosInstance.post('/user', data)
                    .then(res => {
                        console.log(res);
                        if (res.data.code === 204) {
                            const validation = res.data.validationErrors
                            validation.map(element => {
                                setError(element.field, {
                                    type: 'manual',
                                    message: element.message,
                                })
                            })
                        }
                        if (res.data.code == 200) {
                            navigate(currentLocation, { replace: true })
                            toast.success(res.data.message)
                            reset()
                        }
                    })
            })
            .catch((err) => {
                console.log(err.message);
            });
        console.log(data);
    }
    return (
        <div>
            <p className="text-lg font-bold text-indigo-400 text-center border-b">Sign Up</p>
            <form onSubmit={handleSubmit(handleSignUp)}>
                    <label className="form-control basis-3/5 ">
                        <div className="label">
                            <span className="label-text">Full Name</span>
                        </div>
                        <input type="text" {...register('name', { required: "The field is required" })} placeholder="Name" className="input input-sm input-bordered focus:outline-none focus:border-primary w-full " />
                        {errors?.name && <p className="text-red-400">{errors.name.message}</p>}
                    </label>
                <div className="flex gap-3">
                <label className="form-control basis-2/5 ">
                        <div className="label">
                            <span className="label-text">Room No</span>
                        </div>
                        <select {...register('roomNo',{required:"Select Room."})} defaultValue={''} className="select select-bordered  focus:outline-none focus:border-primary select-sm w-full ">
                            <option disabled  value=''>--Select Room--</option>
                            {roomDataJson?.roomData.map((group, groupIndex) => (
                                <optgroup key={groupIndex} label={group.roomType}>
                                    {group?.rooms?.map((option, optionIndex) => (
                                        <option key={`${groupIndex}-${optionIndex}`} value={option.roomNo}>
                                            {option.roomNo}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        
                        {errors?.roomNo && <p className="text-red-400">{errors.roomNo.message}</p>}
                    </label>
                    <label className="form-control basis-3/5 ">
                        <div className="label">
                            <span className="label-text">Profession</span>
                        </div>
                        <select {...register('profession',{required:"Select Profession."})}  defaultValue={''} className="select select-bordered  focus:outline-none focus:border-primary select-sm w-full ">
                            <option disabled value=''>--Select Profession--</option>
                                    {professions?.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                        </select>
                        
                        {errors?.roomNo && <p className="text-red-400">{errors.roomNo.message}</p>}
                    </label>
                </div>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="email" {...register('email', { required: "The field is required" })} placeholder="Email" className="input input-sm input-bordered focus:outline-none focus:border-primary w-full " />
                    {errors?.email && <p className="text-red-400">{errors.email.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered focus-within:outline-none focus-within:border-primary w-full ">
                        <input type={`${showPassword ? "text" : "password"}`} {...register('password', { required: "The field is required" })} placeholder=" Password" className="flex-grow" />
                        <Link className="flex items-center" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</Link>
                    </div>
                    {errors?.password && <p className="text-red-400">{errors.password.message}</p>}
                </label>
                <label className="form-control w-full ">
                    <div className="label">
                        <span className="label-text">Confirm Password</span>
                    </div>
                    <div className="flex input input-sm input-bordered focus-within:outline-none focus-within:border-primary w-full ">
                        <input type={`${showPassword ? "text" : "password"}`} {...register('confirmPassword', { required: "The field is required", validate: value => value == watch('password') || 'Passwords do not match' })} placeholder="Confirm Password" className="flex-grow" />
                        <Link className="flex items-center" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</Link>
                    </div>
                    {errors?.confirmPassword && <p className="text-red-400">{errors.confirmPassword.message}</p>}
                </label>
                <button type="submit" className="btn btn-sm btn-primary rounded-full w-full mt-3"><FaArrowRight /> Sing in</button>
            </form>
        </div>
    );
};

export default SignUpForm;