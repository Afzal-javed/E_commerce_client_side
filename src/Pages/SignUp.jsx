import React, { useState } from 'react'
import profile from "../assets/profile.gif";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from "axios";
const SignUp = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (selectedImage) {
            formData.append('profile', selectedImage, selectedImage.name);
        }
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            if (response?.status === 200) {
                toast("User register successfully");
                localStorage.setItem('user:detail', JSON.stringify(response?.data?.newUser));
                navigate("/login");
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                toast(error?.response?.data?.msg);
            } else if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg);
            }
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    }
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-xl'>
                <h2 className='text-2xl font-bold mb-1'>Welcome</h2>
                <h4 className='text-lg mb-1'>Sign Up</h4>
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
                    {
                        selectedImage ?
                            <img src={URL.createObjectURL(selectedImage)}
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

            </div>
        </div>
    )
}

export default SignUp