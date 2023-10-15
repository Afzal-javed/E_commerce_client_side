import React from 'react'
import ItemCard from './ItemCard'
import Slider from "react-slick";
import { Settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const GadgetCard = ({ homeProductCardListGadget, loadingArray }) => {
    return (
        <div className=' w-full p-4'>
            <div className='my-6'>
                <h1 className='text-3xl font-semibold'>New Brand <span className='text-red-800'>Gadgets</span> </h1>
            </div>
            <Slider {...Settings} vertical={false} horizontal={true}>
                {
                    homeProductCardListGadget ? homeProductCardListGadget.map((product, index) => {
                        return (
                            <div key={index} className='p-4'>
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
                    }) :
                        loadingArray.map((ele, index) => {
                            return (
                                <ItemCard
                                    key={index}
                                />
                            )
                        })
                }
            </Slider>
        </div>
    )
}

export default GadgetCard