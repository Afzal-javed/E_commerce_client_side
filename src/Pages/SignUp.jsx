import React, { useState } from 'react'
import profile from "../assets/profile.gif";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import callAxios from '../../utils/axios';
const SignUp = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [url,setUrl]=useState("");
    const [data, setData] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const verifyOtp=async()=>{
        try {
            await callAxios("post","user/verifyOTP",{
                otp: otp
            })
            toast?.success("OTP verified successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.msg||"Something went wrong");
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
           const payload={
               name:data.fullName,
               email:data.email,
               password:data.password,
               profile: url,
               role:"USER"
           }
            const res = await callAxios("post", "user/sendOTP", payload);
           toast?.success(res?.msg||"OTP sent successfully");
           setShowOtp(true);
        } catch (error) {
            if (error?.response?.status === 400) {
                toast(error?.response?.data?.msg);
            } else if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg);
            }
        }
    }
    const handleImageChange = async(e) => {
        const file = e.target.files[0];
        console.log(file)
        try {
            if (file) {
                const formData=new FormData();
                formData.append('file',file);
                const res = await callAxios("post", 'upload/singleFileUpload', formData);
                setUrl(res?.url);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.msg||"Something went wrong");
            setUrl("")
        } 
       
    }
    return (
        <div className='p-3 md:p-4'>
          {!showOtp ?   <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-xl'>
                <h2 className='text-2xl font-bold mb-1'>Welcome</h2>
                <h4 className='text-lg mb-1'>Sign Up</h4>
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    {
                        url ?
                            <img src={url}
                                alt='profile'
                                className='w-full h-[80px] object-cover rounded-full' /> :
                            <>
                                <img src={profile} className='w-full' alt='Avatar' />
                                <label htmlFor='profile'>
                                    <div className='absolute left-0.5 bottom-0 h-1/3 w-full bg-slate-600 text-center'>
                                        <p className='text-sm p-1 text-white cursor-pointer'>Upload</p>
                                    </div>
                                    <input type='file' id='profile' name='profile' accept='image/*' className='hidden' onChange={handleImageChange} />
                                </label>
                            </>
                    }
                </div>
                <form className='w-full py-2' onSubmit={handleSubmit}>
                    <label htmlFor='fullName'>FullName</label>
                    <input type='text' id='fullName' name='fullName' value={data.fullName} onChange={handleChange} className='mt-2 mb-2 w-full bg-slate-300 p-1 border-none outline-none rounded-lg' placeholder='Enter your name' />
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={data.email} onChange={handleChange} className='mt-2 mb-2 w-full bg-slate-300 p-1 border-none outline-none rounded-lg' placeholder='Enter your email' />
                    <label htmlFor='password'>Password</label>
                    <div className='relative'>
                        <input type={isShowPassword ? 'text' : 'password'} id='password' name='password' value={data.password} onChange={handleChange} className='mt-2 mb-2 w-full bg-slate-300 p-1 border-none outline-none rounded-lg' placeholder='Enter your password' />
                        <span className='absolute right-1 top-2.5 cursor-pointer' onClick={() => setIsShowPassword(prev => !prev)}>
                            {
                                isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
                            }

                        </span>
                    </div>
                    <div className='flex items-center justify-center mt-3'>
                        <button type='submit' className='bg-[darkslategray] hover:bg-[lightblue] hover:text-black p-1.5 w-[35%] text-white rounded-full'>Sign Up</button>
                    </div>
                    <div className='flex items-center justify-center mt-2'>
                        <p className='text-lg'> Already have an account ? <Link to={"/login"} className=' text-[darkblue] cursor-pointer'>login</Link></p>
                    </div>
                </form>

            </div> :
                <div className='w-full max-w-sm bg-white m-auto flex items-start flex-col p-4 rounded-xl'>
                    <h1 className='text-2xl font-bold w-full text-center'>OTP</h1>
                    <div className='w-full flex flex-col items-start'>

                    <label htmlFor='fullName'>OTP</label>
                    <input type='number' id='fullName'  value={otp} onChange={(e)=>setOtp(e.target.value)} className='mt-2 mb-2 w-full bg-slate-300 p-1 border-none outline-none rounded-lg' placeholder='Enter OTP' />
                    </div>
                    <div className=' w-full flex items-center justify-center mt-3'>
                        <button type='submit' className='bg-[darkslategray] hover:bg-[lightblue] hover:text-black p-1.5 w-[35%] text-white rounded-full' onClick={verifyOtp}>Submit</button>
                    </div>
                    <div className='flex items-center justify-center mt-2'>
                        <p className='text-lg'> Back to Sign In ? <span className=' text-[darkblue] cursor-pointer' onClick={()=>setShowOtp(false)}>Sign In</span></p>
                    </div>
            </div>
            }
        </div>
    )
}

export default SignUp