import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "../Component/ItemCard";
import { addCartItem } from "../redux/productSlice";
import { fetchProducts } from "../../utils/fetchProducts";
import toast from "react-hot-toast";

const Menu = () => {
  // const productData = useSelector((state) => state.product)
  const filterId = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [productData, setProductData] = React.useState([]);
 let limit=20
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts(limit, page);
        setPage(response?.currentPage);
        setTotalPage(response?.totalPages);
        setProductData(response?.data);
      } catch (error) {
        console.log("error", error);
        toast.error(error?.response?.data?.msg || "Something went wrong");
      }
    };
    fetchData();
  }, [limit, page, dispatch]);
  const productFilterById = productData?.filter(
    (product) => product?._id === filterId.id
  )[0];
  const productCategory = productFilterById?.productCategory;
  const productFilterByCategory = productData?.filter(
    (product) => product?.productCategory === productCategory
  );
  const handleCartItem = () => {
    dispatch(
      addCartItem({
        id: productFilterById?._id,
        productName: productFilterById?.productName,
        category: productFilterById?.productCategory,
        productImage: productFilterById?.productImage,
        price: productFilterById?.productPrice,
        description: productFilterById?.productDescription,
      })
    );
  };
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
    <div className="w-full p-3 md:p-5">
      {filterId.id !== "null" ? (
        <>
          <div className="w-[90%] flex flex-col sm:flex-row gap-2 md:w-[50%] md:p-4 md:flex md:items-center md:gap-3 bg-white m-auto md:h-70 rounded-xl">
            <div className="overflow-hidden object-cover w-full ">
              <img src={productFilterById?.productImage} alt="productImage" />
            </div>
            <div className="px-4 py-2 md:p-3 ">
              <p className="ml-1 text-lg font-semibold text-slate-900 capitalize">
                {productFilterById?.productName}
              </p>
              <p className="ml-1 text-lg font-semibold text-slate-700 capitalize">
                {productFilterById?.productCategory}
              </p>
              <p className="ml-1 text-lg font-semibold text-slate-900 capitalize">
                Price:<span className="text-red-600"> ₹</span>
                {productFilterById?.productPrice}
              </p>
              <div className="flex items-center justify-start gap-2 mt-1">
                <button onClick={() => navigate("/cart")} className="bg-yellow-600 w-[100px] p-1.5 rounded-full text-white my-1.5 hover:bg-slate-200 hover:text-black">
                  Buy
                </button>
                <button
                  className="bg-yellow-600 w-[100px] p-1.5 rounded-full text-white my-1.5 hover:bg-slate-200 hover:text-black"
                  onClick={handleCartItem}
                >
                  Add to Cart
                </button>
              </div>
              <p className="ml-1 text-lg  text-slate-900 capitalize">
                Description:- {productFilterById?.productDescription}
              </p>
            </div>
          </div>
          <div className=" p-3 md:p-5">
            <div className="my-6">
              <h1 className="text-3xl font-semibold">
                Related <span className="text-red-800">Products</span>{" "}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {productFilterByCategory.map((product) => {
                return (
                  <div key={product?._id}>
                    <ItemCard
                      id={product?._id}
                      productName={product?.productName}
                      category={product?.productCategory}
                      productImage={product?.productImage}
                      price={product?.productPrice}
                      description={product?.productDescription}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" p-3 md:p-5">
            <div className="my-6">
              <h1 className="text-3xl font-bold">
                All <span className="text-red-800">Products</span>{" "}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {productData?.map((product, index) => {
                return (
                  <div key={index}>
                    <ItemCard
                      id={product?._id}
                      productName={product?.productName}
                      category={product?.productCategory}
                      productImage={product?.productImage}
                      price={product?.productPrice}
                      description={product?.productDescription}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

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

export default Menu;
