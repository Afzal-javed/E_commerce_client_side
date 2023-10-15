import React, { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import userLogo from "../assets/profile.gif";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { logoutRedux } from '../redux/userSlice';

const UserAccount = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [isShowLogin, setIsShowLogin] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);
    const totalCartItemNumber = useSelector((state) => state.product.cartItem);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const userId = user?.id
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/${userId}`)
            if (response?.status === 200) {
                localStorage.removeItem('user:token');
                dispatch(logoutRedux());
                toast(userData?.fullName + " " + response?.data?.msg)
                navigate("/login");
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                toast(error?.response?.data?.msg);
            }
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg);
            }
        }

    }
    return (
        <div className='flex items-center justify-center gap-4 md:gap-7'>
            <div className='cursor-pointer relative'>
                <Link to={"/cart"}>
                    <ShoppingCartIcon sx={{ width: '32px', height: '32px' }} />
                    <div className='absolute -top-2 -right-1 text-white bg-red-600 rounded-full h-5 w-4 m-0 p-0 text-sm text-center'>{totalCartItemNumber.length}</div>
                </Link>
            </div>
            <div className='mr-2' onClick={() => setIsShowLogin(prev => !prev)}>
                <div >
                    {
                        user === "" ?
                            <AccountCircleIcon sx={{ width: '32px', height: '32px', cursor: 'pointer' }} />
                            :
                            <div className='w-10 overflow-hidden rounded-full drop-shadow-md shadow-md'>
                                <img src={userData?.profile || userLogo} alt='profile' className='w-[40px] h-[40px] object-cover  rounded-full cursor-pointer' />
                            </div>
                    }
                </div>
                {
                    isShowLogin &&
                    <div className='absolute right-2 bg-slate-700 text-white py-2 rounded-lg  shadow drop-shadow-md flex flex-col '>
                        {
                            userData.fullName &&
                            <p className='w-full mt-1  text-center whitespace-nowrap cursor-pointer'>{userData.fullName}</p>
                        }
                        {
                            userData.email === import.meta.env.VITE_ADMIN_EMAIL &&
                            <Link to={"/newproduct"} className=' mt-1  text-center whitespace-nowrap cursor-pointer px-1'>New Product</Link>
                        }
                        {
                            userData.email !== "" ?
                                <>
                                    <nav className='flex flex-col items-center p-1 md:hidden'>
                                        <Link to={""} className='px-1 py-0.5'>Home</Link>
                                        <Link to={"/menu/null"} className='px-1 py-0.5'>Menu</Link>
                                        <Link to={"/about"} className='px-1 py-0.5'>About</Link>
                                        <Link to={"/contact"} className='px-1 py-0.5'>Contact</Link>
                                    </nav>

                                    <p className='w-[93px]  mt-1  text-center whitespace-nowrap cursor-pointer' onClick={handleLogout}>Logout</p>
                                </>
                                :
                                <Link to={"/login"} className='w-[80px] bg-red-800 text-white text-center whitespace-nowrap cursor-pointer'>Login</Link>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default UserAccount