import React from 'react'
import aboutImage from "../assets/about-photo.jpg"
const About = () => {

    return (
        <div className="bg-cover bg-center " >
            <div className='relative w-full h-[30rem] cursor-default'>
                <img src={aboutImage} className='w-full object-cover  h-[30rem]' alt='aboutImage' />
                <div className='absolute inset-0 flex items-center justify-center'>
                    <h1 className='text-4xl font-bold text-white'>About Us</h1>
                </div>
            </div>
            <div className='mt-3 p-3 w-full md:p-8 grid grid-cols-1'>
                <div className=' gap-3 grid grid-cols-1 md:grid-cols-2'>
                    <div className='bg-slate-800 text-white rounded-xl p-4 flex flex-col items-center'>
                        <h1 className='text-2xl font-semibold my-2'>Company Background</h1>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Mission Statement:</span> Clearly state your company's mission and values. Explain why your ecommerce platform exists and what it aims to achieve.</p>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Founding Story:</span> Share a brief history of how and why the company was founded. Personalize the story to make it relatable.</p>
                    </div>
                    <div className='bg-slate-800 text-white rounded-xl p-4 flex flex-col items-center'>
                        <h1 className='text-2xl font-semibold my-2'>Team Information</h1>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Founder/CEO Message:</span> A personal message from the founder or CEO adds a human touch and helps customers connect with the people behind the brand</p>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Team Photos and Bios:</span>  Introduce key team members with photos and short bios. This helps create a sense of transparency and familiarity.</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
                    <div className='bg-slate-800 text-white rounded-xl p-4 flex flex-col items-center '>
                        <h1 className='text-2xl font-semibold my-2'>Brand Identity</h1>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Brand Story:</span>  Share the story behind your brand's name, logo, and overall visual identity.</p>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Values and Culture:</span>Highlight your company's core values and culture. This can include your commitment to quality, customer service, sustainability, or other important principles.</p>
                    </div>
                    <div className='bg-slate-800 text-white rounded-xl p-4 flex flex-col items-center'>
                        <h1 className='text-2xl font-semibold my-2'>Customer-Centric Information</h1>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Customer Testimonials:</span> Feature positive reviews and testimonials from satisfied customers. Real-life experiences can build trust.</p>
                        <p className='text-lg my-2 text-justify'><span className='text-xl font-semibold'>Customer Service Approach:</span>Outline your commitment to excellent customer service. Include contact information for customer support.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About