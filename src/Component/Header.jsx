import React, { useState } from 'react'
import logo from "../assets/logo1.png"
import { Link, } from 'react-router-dom'
import UserAccount from './UserAccount'
import SearchBar from './SearchBar'
const Header = () => {
    return (
        <header className='fixed w-full bg-white shadow-md h-16 px-2 md:px-4 z-10'>
            <div className='flex items-center justify-between'>
                <Link to={"/"}>
                    <div className=''>
                        <img src={logo} alt='logo' width={65} height={65} />
                    </div>
                </Link>
                <SearchBar />
                <div className='flex items-center justify-center gap-4 md:gap-7'>
                    <nav className=' md:gap-6 text-base md:text-lg md:flex hidden'>
                        <Link to={""}>Home</Link>
                        <Link to={"/menu/null"}>Menu</Link>
                        <Link to={"/about"}>About</Link>
                        <Link to={"/contact"}>Contact</Link>
                    </nav>
                    <UserAccount />
                </div>
            </div>
        </header>

    )
}

export default Header