import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineDelete } from "react-icons/ai";
import { deleteCartItem, increaseQty, decreaseQty } from '../redux/productSlice';
import emptyCart from "../assets/empty-cart.jpg";
const Cart = () => {
    const productCartData = useSelector((state) => state.product.cartItem)
    const dispatch = useDispatch();
    const totalPrice = productCartData.reduce((acc, curr) => acc + parseInt(curr.totalValue), 0);
    const totalQty = productCartData.reduce((acc, curr) => acc + parseFloat(curr.qty), 0);
    return (
        <div className={`p-1 md:p-5 ${productCartData.length > 0 ? '' : 'bg-white h-screen'}`}>

            {
                productCartData.length > 0 ?
                    <>

                        <h1 className='text-3xl mt-2 font-bold'>Your Cart <span className='text-red-800'>Items</span> </h1>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div className='mt-3 md:mt-6 md:w-[50rem] flex flex-col items-center overflow-y-auto max-h-[80vh] scroll-smooth '>
                                {
                                    productCartData?.map((product, index) => {
                                        return (
                                            <div key={index} className='bg-slate-700 shadow-lg text-white cursor-default max-w-[42rem] flex items-center gap-3 rounded-lg my-2 md:my-4 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300' >
                                                <div className='w-[35%] rounded-l-lg bg-white'>
                                                    <img src={product?.productImage} alt='productImage' />
                                                </div>
                                                <div className='p-3 w-[60%]'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-2xl font-semibold'>{product?.productName}</p>
                                                        <div className='text-2xl font-semibold cursor-pointer hover:text-red-600' onClick={() => dispatch(deleteCartItem(product?.id))}>
                                                            <AiOutlineDelete />
                                                        </div>
                                                    </div>
                                                    <p className='text-lg mt-2 font-semibold text-slate-200'>{product?.catagory}</p>
                                                    <p className='text-xl mt-2 font-semibold'><span className='text-red-600'>₹ </span>{product?.price}</p>
                                                    <div className='w-full flex items-center justify-between '>
                                                        <span className='flex items-center gap-3 text-lg cursor-pointer'><AiOutlineMinusCircle onClick={() => dispatch(decreaseQty(product?.id))} />{product?.qty}<AiOutlinePlusCircle onClick={() => dispatch(increaseQty(product?.id))} /></span>
                                                        <span className=' text-red-600 text-xl flex font-bold'>Total : <span className='text-black ml-1'> ₹</span><p className='text-white ml-1'>{product?.totalValue}</p></span>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                            <div className=' md:w-[35rem] flex items-start justify-center cursor-default'>
                                <div className='bg-white flex flex-col  mt-3 md:mt-10 w-[30rem] rounded-xl'>
                                    <div className='text-center p-2 text-white rounded-t-xl bg-slate-700'>
                                        <p className='text-xl font-semibold'>Reciept</p>
                                    </div>
                                    <hr />
                                    <div className='p-5'>
                                        <p className='text-xl text-slate-800 flex items-center my-2 justify-between font-semibold'>Total Quantity : <span className='text-black font-bold'>{totalQty}</span> </p>

                                        <p className='text-xl text-slate-800 flex items-center my-2 justify-between font-semibold'>Total Price : <span className='text-black font-bold'><span className='text-red-700 ml-1'> ₹</span> {totalPrice}</span> </p>

                                    </div>
                                    <div className='text-center p-2 text-white rounded-b-xl cursor-pointer hover:bg-slate-700 bg-red-700 '>
                                        <button className='text-xl font-bold'>Payment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> :
                    <div className='flex flex-col items-center'>
                        <h1 className='mb-3 text-3xl font-bold'>Empty <span className='text-red-800'>Cart</span> </h1>
                        <img src={emptyCart} alt='Empty-Cart' className='max-w-md ' />
                    </div>
            }
        </div>
    )
}

export default Cart