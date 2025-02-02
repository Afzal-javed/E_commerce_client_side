import toast from "react-hot-toast";
import callAxios from "./axios";

export const fetchProducts = async (limit, page, search,sortField,sortOrder) => {
    const response = await callAxios(
        "get",
        `products/getAllProducts?limit=${limit}&page=${page}&search=${search||""}&sortField=${sortField||"createdAt"}&sortOrder=${sortOrder||"desc"}`,
        null,
        true
      );
    return response
}

export const addToCart = async(payload) =>{
  try {
    const response = await callAxios("post",`products/addToCart`,payload,true);
    return response
  } catch (error) {
    console.log("error",error);
    toast.error("Error to adding product to cart");
  }
}
export const getCart=async()=>{
  try {
    const response = await callAxios("get",`products/getCartItem`);
    return response
  } catch (error) {
    console.log("error",error);
    toast.error("Error to getting cart");
  }
}

export const createOrder=async(payload)=>{
  try {
    const response = await callAxios("post",`orders/create-order`,payload,true);
    return response
  } catch (error) {
    console.log("error",error);
    toast.error("Error to creating order");
  }
}

export const verifyPayment=async(payload)=>{
  try {
    const response = await callAxios("post",`orders/verify-signature`,payload,true);
    return response
  } catch (error) {
    console.log("error",error);
    toast.error("Error to verifying payment");
  }
}