import React, { useEffect, useState } from 'react'
import logo from "../assets/profile.gif";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';
const Login = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [data, setData] = useState({
        email: user?.email || "",
        password: user?.password || ""
    })
    const navigate = useNavigate();
    const userDataSelector = state => state.user;
    const usersData = useSelector(userDataSelector);
    useEffect(() => {
    }, [usersData]);
    const dispatch = useDispatch();
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
        const userData = {
            email: data?.email,
            password: data?.password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, userData);
            if (response?.data?.token) {
                localStorage.setItem('user:detail', JSON.stringify(response?.data?.user));
                localStorage.setItem('user:token', JSON.stringify(response?.data?.token));
                toast(user?.fullName + " login Successfully");
            }
            dispatch(loginRedux({ data: { id: response?.data?.user?.id, email: response?.data?.user?.email, fullName: response?.data?.user?.fullName, profile: response?.data?.user?.profile } }));
            navigate("/");
        } catch (error) {
            if (error?.response?.status === 400) {
                toast(error?.response?.data?.msg);
            } else if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg);
            }
            console.log("Error " + error?.response);
        }

    }
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-sm bg-white m-auto flex items-center flex-col p-4 rounded-xl'>
                <h2 className='text-2xl font-bold mb-1'>Welcome Again</h2>
                <h4 className='text-lg mb-1'>Login</h4>
                <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
                    <img src={user?.profile || logo} className='w-full h-[80px] object-cover rounded-full' alt='profile' />
                </div>
                <form className='w-full py-2' onSubmit={handleSubmit}>
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
                        <button type='submit' className='bg-[darkslategray] hover:bg-[lightblue] hover:text-black p-1.5 w-[35%] text-white rounded-full'>Login</button>
                    </div>
                    <div className='flex items-center justify-center mt-2'>
                        <p className='text-lg'> Do not have an account ? <Link to={"/signup"} className=' text-[darkblue] cursor-pointer'>Sign Up</Link></p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login