import React from 'react'
import ItemCard from './ItemCard'
import Slider from "react-slick";
import { Settings } from './settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';

const ProductCard = ({ productData, loadingArray }) => {
    return (
        <div className=' w-full p-4'>
            <div className='my-6'>
                <h1 className='text-3xl font-semibold'>Fresh <span className='text-red-800'>Products</span> </h1>
            </div>
            <Slider {...Settings} vertical={false} horizontal={true}>
                {
                    productData ? productData.map((product, index) => {
                        return (
                            <div key={index} className='p-4'>
                                <ItemCard
                                    id={product?.id}
                                    productName={product?.productName}
                                    category={product?.productCategory}
                                    productImage={product?.productImage}
                                    price={product?.productPrice}
                                    description={product?.productDescription}
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
ProductCard.propTypes = {
    productData: PropTypes.array,
    loadingArray: PropTypes.array.isRequired, // Ensure 'loadingArray' is passed and is an array
};

export default ProductCard