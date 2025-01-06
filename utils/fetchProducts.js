import callAxios from "./axios";

export const fetchProducts = async (limit, page, search,sortField,sortOrder) => {
    const response = await callAxios(
        "get",
        `products/getAllProducts?limit=${limit}&page=${page}&search=${search||""}&sortField=${sortField||"createdAt"}&sortOrder=${sortOrder||"desc"}`
      );
    return response
}