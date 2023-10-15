import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
const SearchBar = () => {
    const [data, setData] = useState("");
    const navigate = useNavigate();
    const productData = useSelector((state) => state.product);
    const handleSearch = () => {
        const searchProductData = productData?.productList?.filter((product) => product?.products?.productName === data)
        if (searchProductData.length !== 0) {
            const id = searchProductData[0]?.products?.id
            setData("");
            navigate(`/menu/${id}`)
        } else {
            toast("Item not available")
        }

    }
    return (
        <div className='bg-slate-200 w-[11rem]  md:w-[25rem] flex rounded-full'>
            <input type='text' name='productName' value={data} onChange={(e) => setData(e.target.value)} className='w-full ml-3 bg-slate-200 rounded-full text-lg capitalize p-0.5 outline-none' placeholder='Search Produts Here' />
            <div className='text-2xl w-[10%] text-white rounded-r-full flex items-center justify-center cursor-pointer p-1 bg-red-800' onClick={handleSearch}><AiOutlineSearch /></div>
        </div>
    )
}

export default SearchBar