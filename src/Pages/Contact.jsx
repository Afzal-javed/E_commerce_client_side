import React, { useRef } from 'react'
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import linkedin2 from "../assets/linkedin2.ico";
import github from "../assets/github3.png";
import insta from "../assets/insta.png";
import porfolio from "../assets/portfolio.png";
const Contact = () => {
    const form = useRef();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user)
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text)
                e.target.reset();
                toast("Email send successfully")
            }, (error) => {
                toast("Unable to send email");
            })
    }
    const handleLogin = () => {
        navigate("/login");
    }
    return (
        <div className='p-3 md:p-5'>
            <div className='max-w-2xl flex flex-col items-center p-3 bg-slate-700 rounded-xl m-auto'>
                <h1 className='text-3xl mt-2 font-bold text-white'>Contact<span className='text-red-600 ml-2'>Us</span> </h1>
                <form className='flex flex-col items-center w-full' ref={form} onSubmit={userData.email !== "" ? sendEmail : handleLogin}>
                    <div className='flex flex-col w-full mt-3 gap-1'>
                        <label htmlFor='name' className='ml-3 text-white text-lg font-semibold'>Name</label>
                        <input type='text' id='name' name='your_name' className='bg-slate-200 p-1.5 text-black border-none outline-none rounded-lg capitalize' placeholder='Enter your name' />
                    </div>
                    <div className='flex flex-col w-full mt-3 gap-1'>
                        <label htmlFor='email' className='ml-3 text-white text-lg font-semibold'>Email</label>
                        <input type='email' id='email' name='your_email' className='bg-slate-200 p-1.5 text-black border-none outline-none rounded-lg' placeholder='Enter your email' />
                    </div>
                    <div className='flex flex-col w-full mt-3 gap-1'>
                        <label htmlFor='message' className='ml-3 text-white text-lg font-semibold'>Message</label>
                        <textarea type='text' id='message' name='message' rows={4} className='bg-slate-200 resize-none p-1.5 text-black border-none outline-none rounded-lg capitalize' placeholder='Enter your message' />
                    </div>
                    <div className='bg-red-600 mt-4 mb-2 w-[10rem] text-center rounded-full cursor-pointer hover:bg-red-900'>
                        <button type='submit' value='Send' className='p-2 text-white text-lg font-semibold'>Send</button>
                    </div>
                </form>
            </div>
            <div className="flex items-center justify-center mt-3">
                <img src={porfolio} className='w-[3rem] cursor-pointer' alt='twitter' onClick={() => window.open("https://aj-portfolio-2023.netlify.app/")} />
                <img src={linkedin2} className='w-[3rem] cursor-pointer' alt='linkedin' onClick={() => window.open("https://www.linkedin.com/in/afzal-javed/")} />
                <img id='github' className='w-[3rem] cursor-pointer' src={github} alt='github' onClick={() => window.open("https://github.com/Afzal-javed/")} />
                <img id='insta' className='w-[3rem] cursor-pointer' src={insta} alt='insta' onClick={() => window.open("https://instagram.com/shaikh_afzal_javed?igshid=ZGUzMzM3NWJiOQ==")} />
            </div>
        </div>
    )
}

export default Contact 