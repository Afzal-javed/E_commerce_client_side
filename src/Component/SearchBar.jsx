import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { fetchProducts } from "../../utils/fetchProducts";
import { setDataProduct } from "../redux/productSlice";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await fetchProducts(100, 1, data);
      dispatch(setDataProduct(res?.data));
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };
  const handleSearch = () => {
    getData();
    setData("");
    // navigate(`/menu/${id}`);
  };
  return (
    <div className="bg-slate-200 w-[11rem]  md:w-[25rem] flex rounded-full">
      <input
        type="text"
        name="productName"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full ml-3 bg-slate-200 rounded-full text-lg capitalize p-1 outline-none"
        placeholder="Search Products Here"
      />
      <div
        className="text-2xl w-[20%]  text-white rounded-r-full flex items-center justify-center cursor-pointer p-1 bg-red-800"
        onClick={handleSearch}
      >
        <AiOutlineSearch />
      </div>
    </div>
  );
};

export default SearchBar;
