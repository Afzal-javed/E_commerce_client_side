import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { setDataProduct } from '../redux/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import HomeCard from '../Component/HomeCard'
import VegitableCard from '../Component/VegitableCard'
import FruitCard from '../Component/FruitCard'
import FoodCard from '../Component/FoodCard'
import GadgetCard from '../Component/GadgetCard'
import FurnitureCard from '../Component/FurnitureCard'
import ElectronicsCard from '../Component/ElectronicsCard'
import OtherCard from '../Component/OtherCard'
const Home = () => {
    const dispatch = useDispatch();
    const productData = useSelector((state) => state.product);
    const homeProductCardList = productData?.productList.slice(0, 6);
    const homeProductCardListVegitables = productData?.productList?.filter(product => product?.products?.catagory === "vagitable")
    const homeProductCardListFruits = productData?.productList?.filter(product => product?.products?.catagory === 'fruits')
    const homeProductCardListElectronics = productData?.productList?.filter(product => product?.products?.catagory === 'electronics')
    const homeProductCardListFood = productData?.productList?.filter(product => product?.products?.catagory === 'food')
    const homeProductCardListFurniture = productData?.productList?.filter(product => product?.products?.catagory === 'furniture')
    const homeProductCardListGadget = productData?.productList?.filter(product => product?.products?.catagory === 'gadget')
    const homeProductCardListOther = productData?.productList?.filter(product => product?.products?.catagory === 'other')
    const loadingArray = new Array(4);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/product`);
                dispatch(setDataProduct(response?.data));
            } catch (error) {
                toast(error?.response?.data?.msg);
            }
        }
        fetchData();
    }, [])
    return (
        <div className='p-2 md:p-5'>
            <div className='md:flex gap-4 w-full'>
                <div className='md:w-1/2 bg-white rounded-3xl'>
                    <h2 className='text-6xl font-semibold p-3'>The Fastest Delivery At <span className='text-red-800 font-sans font-bold'>Your Door Step</span></h2>
                    <div className='text-lg p-3 text-justify'>
                        <p>Welcome to our Food Delivery Ecommerce Website – your ultimate destination for a culinary journey that brings the finest flavors right to your doorstep. Our platform is a seamless blend of convenience, variety, and quality, designed to elevate your dining experience</p>
                        <p>Embark on a gastronomic adventure with our diverse menu featuring cuisines from around the world. From sizzling street food to gourmet delights.</p>
                    </div>
                    <div className='p-3 flex items-center justify-center mb-3'>
                        <button className='w-110px md:w-1/4 bg-red-800 p-3 text-lg cursor-pointer hover:bg-red-500 text-white rounded-full'>Order Now</button>
                    </div>
                </div>
                <div className='md:w-1/2  rounded-3xl'>
                    <div className='flex flex-wrap gap-5'>
                        {
                            homeProductCardList[0] ? homeProductCardList.map((product, index) => {
                                return (
                                    <div key={index}>
                                        <HomeCard
                                            id={product?.products?.id}
                                            productName={product?.products?.productName}
                                            catagory={product?.products?.catagory}
                                            productImage={product?.products?.productimage}
                                            price={product?.products?.price}
                                            description={product?.products?.description}
                                        />
                                    </div>
                                )
                            }) :
                                loadingArray.map((ele, index) => {
                                    return (
                                        <HomeCard
                                            key={index}
                                        />
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
            <VegitableCard
                homeProductCardListVegitables={homeProductCardListVegitables}
                loadingArray={loadingArray}
            />
            <FruitCard
                homeProductCardListFruits={homeProductCardListFruits}
                loadingArray={loadingArray}
            />
            <FoodCard
                homeProductCardListFood={homeProductCardListFood}
                loadingArray={loadingArray}
            />
            <GadgetCard
                homeProductCardListGadget={homeProductCardListGadget}
                loadingArray={loadingArray}
            />
            <FurnitureCard
                homeProductCardListFurniture={homeProductCardListFurniture}
                loadingArray={loadingArray}
            />
            <ElectronicsCard
                homeProductCardListElectronics={homeProductCardListElectronics}
                loadingArray={loadingArray}
            />
            <OtherCard
                homeProductCardListOther={homeProductCardListOther}
                loadingArray={loadingArray}
            />

        </div>
    )
}

export default Home