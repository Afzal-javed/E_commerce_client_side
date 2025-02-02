import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import UpdateAndDelete from './UpdateAndDelete'

const ItemCard = ({ id, productName, category, price, productImage, description,saveProductItemToCart }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const [deleted, setDeleted] = useState(false);
    const handleCartItem = () => {
        dispatch(addCartItem({
            id: id,
            productName: productName,
            category: category,
            productImage: productImage,
            price: price,
            description: description
        }));
    }
    const handleDelete = () => {
        setDeleted(true);
    }
    return (

        <div className=' md:flex w-[210px] min-h-[22rem] p-2 cursor-pointer shadow-lg bg-white gap-5 rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 overflow-hidden duration-300'>
            {
                productName ? (
                    <div className='flex flex-col items-center'>
                        <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                            <div className='min-h-[160px]'>
                                <img src={productImage} alt='productImage' className='w-full h-full' />
                            </div>
                            <h3 className='text-lg font-semibold text-center text-slate-900 capitalize'>{productName}</h3>
                            <p className='text-m text-center font-semibold text-slate-600'>{category}</p>
                            <p className='text-lg font-semibold text-center text-slate-900 capitalize'><span className='text-red-600'>₹</span>{price}</p>
                        </Link>
                        <div>
                            {
                                userData.email === "afzaljaved59832@gmail.com" ?
                                    <UpdateAndDelete id={id} onDelete={handleDelete} /> :
                                    <button className='bg-yellow-600 w-[160px] p-1.5 rounded-full text-white my-1.5 hover:bg-slate-200 hover:text-black' onClick={()=>{
                                        if (typeof saveProductItemToCart === 'function') {
                                            saveProductItemToCart(id);
                                            handleCartItem();
                                          } else {
                                            console.error("saveProductItemToCart is not a function");
                                          }
                                    }}>Add to Cart</button>
                            }
                        </div>
                    </div>
                ) : (
                    <div className='animate-pulse'>
                    <div className='w-40 min-h-[180px] bg-gray-200 rounded-lg'></div>
                    <div className='mt-2 h-4 w-3/4 bg-gray-200 rounded'></div>
                    <div className='mt-1 h-4 w-1/2 bg-gray-200 rounded'></div>
                    <div className='mt-1 h-6 w-2/4 bg-gray-300 rounded'></div>
                </div>
                )
            }

        </div>
    )
}

export default ItemCard