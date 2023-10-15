import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ItemCard from '../Component/ItemCard';
import { addCartItem } from '../redux/productSlice';

const Menu = () => {
    const productData = useSelector((state) => state.product)
    const filterId = useParams();
    const dispatch = useDispatch();
    const productFilterById = productData?.productList?.filter((product) => product?.products?.id === filterId.id);
    const productCategory = productFilterById[0]?.products?.catagory
    const productFilterByCategory = productData?.productList?.filter((product) => product?.products?.catagory === productCategory);
    const handleCartItem = () => {
        dispatch(addCartItem({
            id: productFilterById[0]?.products.id,
            productName: productFilterById[0]?.products.productName,
            catagory: productFilterById[0]?.products.catagory,
            productImage: productFilterById[0]?.products.productimage,
            price: productFilterById[0]?.products.price,
            description: productFilterById[0]?.products.description
        }));
    }
    return (
        <div className='w-full p-3 md:p-5'>
            {
                filterId.id !== "null" ?
                    <>
                        <div className='w-[90%] flex flex-col sm:flex-row gap-2 md:w-[50%] md:p-4 md:flex md:items-center md:gap-3 bg-white m-auto md:h-70 rounded-xl'>
                            <div className='overflow-hidden object-cover w-full '>
                                <img src={productFilterById[0]?.products?.productimage} alt='productImage' />
                            </div>
                            <div className='px-4 py-2 md:p-3 '>
                                <p className='ml-1 text-lg font-semibold text-slate-900 capitalize'>{productFilterById[0]?.products?.productName}</p>
                                <p className='ml-1 text-lg font-semibold text-slate-700 capitalize'>{productFilterById[0]?.products?.catagory}</p>
                                <p className='ml-1 text-lg font-semibold text-slate-900 capitalize'>Price:<span className='text-red-600'> ₹</span>{productFilterById[0]?.products?.price}</p>
                                <div className='flex items-center justify-start gap-2 mt-1'>
                                    <button className='bg-yellow-600 w-[100px] p-1.5 rounded-full text-white my-1.5 hover:bg-slate-200 hover:text-black'>Buy</button>
                                    <button className='bg-yellow-600 w-[100px] p-1.5 rounded-full text-white my-1.5 hover:bg-slate-200 hover:text-black' onClick={handleCartItem}>Add to Cart</button>
                                </div>
                                <p className='ml-1 text-lg  text-slate-900 capitalize'>Description:- {productFilterById[0]?.products?.description}</p>
                            </div>
                        </div>
                        <div className=' p-3 md:p-5'>
                            <div className='my-6'>
                                <h1 className='text-3xl font-semibold'>Related <span className='text-red-800'>Products</span> </h1>
                            </div>
                            <div className='flex flex-wrap gap-3 items-center justify-center'>
                                {
                                    productFilterByCategory.map((product) => {
                                        return (
                                            <div key={product?.products?.id}>
                                                <ItemCard
                                                    id={product?.products?.id}
                                                    productName={product?.products?.productName}
                                                    catagory={product?.products?.catagory}
                                                    productImage={product?.products?.productimage}
                                                    price={product?.products?.price}
                                                    description={product?.products?.description}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </> :
                    <>
                        <div className=' p-3 md:p-5'>
                            <div className='my-6'>
                                <h1 className='text-3xl font-bold'>All <span className='text-red-800'>Products</span> </h1>
                            </div>
                            <div className='flex flex-wrap gap-3 items-center justify-center'>
                                {
                                    productData?.productList?.map((product) => {
                                        return (
                                            <div key={product?.products?.id}>
                                                <ItemCard
                                                    id={product?.products?.id}
                                                    productName={product?.products?.productName}
                                                    catagory={product?.products?.catagory}
                                                    productImage={product?.products?.productimage}
                                                    price={product?.products?.price}
                                                    description={product?.products?.description}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
            }

        </div>
    )
}

export default Menu