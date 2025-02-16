import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { setDataProduct } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import HomeCard from "../Component/HomeCard";
import ProductCard from "../Component/ProductCard";

import callAxios from "../../utils/axios";
import { fetchProducts } from "../../utils/fetchProducts";
const Home = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product?.productList);
  const [limit, setLimit] = React.useState(7);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  const loadingArray = new Array(4);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response=await fetchProducts(limit, page);
        setPage(response?.currentPage);
        setTotalPage(response?.totalPages);
        dispatch(setDataProduct(response?.data));
      } catch (error) {
        console.log("error", error);
        toast.error(error?.response?.data?.msg || "Something went wrong");
      }
    };
    fetchData();
  }, [limit, page, dispatch]);
  const handleNextPage = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className="p-2 md:p-5">
      <div className="md:flex gap-4 w-full">
        <div className="md:w-1/2 bg-white rounded-3xl">
          <h2 className="text-6xl font-semibold p-3">
            The Fastest Delivery At{" "}
            <span className="text-red-800 font-sans font-bold">
              Your Door Step
            </span>
          </h2>
          <div className="text-lg p-3 text-justify">
            <p>
              Welcome to our Food Delivery Ecommerce Website – your ultimate
              destination for a culinary journey that brings the finest flavors
              right to your doorstep. Our platform is a seamless blend of
              convenience, variety, and quality, designed to elevate your dining
              experience
            </p>
            <p>
              Embark on a gastronomic adventure with our diverse menu featuring
              cuisines from around the world. From sizzling street food to
              gourmet delights.
            </p>
          </div>
          <div className="p-3 flex items-center justify-center mb-3">
            <button className="w-110px md:w-1/4 bg-red-800 p-3 text-lg cursor-pointer hover:bg-red-500 text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
        <div className="md:w-1/2  rounded-3xl">
          <div className="flex flex-wrap gap-5">
            {productData
              ? productData.map((product, index) => {
                  return (
                    <div key={index}>
                      <HomeCard
                        id={product?.products?.id}
                        productName={product?.productName}
                        category={product?.productCategory}
                        productImage={product?.productImage}
                        price={product?.productPrice}
                        description={product?.productDescription}
                      />
                    </div>
                  );
                })
              : loadingArray.map((ele, index) => {
                  return <HomeCard key={index} />;
                })}
          </div>
        </div>
      </div>
      <ProductCard
        productData={productData}
        loadingArray={loadingArray}
      />
      <div className="w-full flex items-center justify-center ">
        <div className="w-[60%] flex items-center justify-between mt-4">
          <button
            className={`px-4 py-2 bg-gray-300 rounded ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPage}
          </span>
          <button
            className={`px-4 py-2 bg-gray-300 rounded ${
              page === totalPage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={page === totalPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
