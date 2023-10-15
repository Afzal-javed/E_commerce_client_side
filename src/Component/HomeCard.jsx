import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({ id, productName, catagory, productImage, price, description }) => {
    return (
        <div className=' bg-white min-w-[150px] p-2 rounded-lg shadow-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 overflow-hidden duration-300'>
            {
                productName ? (
                    <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                        <div className='w-40 min-h-[180px]'>
                            <img src={productImage} alt='productImage' className='w-full h-full' />
                        </div>
                        <h3 className='text-lg font-semibold text-center text-slate-900 capitalize'>{productName}</h3>
                        <p className='text-m text-center font-semibold text-slate-600'>{catagory}</p>
                        <p className='text-lg font-semibold text-center text-slate-900 capitalize'><span className='text-red-600'>₹</span>{price}</p>
                    </Link>
                ) : (
                    <div className='flex items-center justify-center min-h-[180px]'>
                        <p className='text-lg font-semibold text-center text-slate-900 capitalize'>Loading...</p>
                    </div>
                )
            }
        </div>
    )
}

export default HomeCard