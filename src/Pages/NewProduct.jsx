import React, { useState } from 'react'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NewProduct = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState({
        productName: "",
        catagory: "",
        price: "",
        description: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (!selectedImage || !product.productName || !product.catagory || !product.price) {
            toast('Please fill all the required field');
        }
        formData.append('productName', product.productName);
        formData.append('catagory', product.catagory);
        formData.append('productimage', selectedImage);
        formData.append('price', product.price);
        formData.append('description', product.description);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/product`, formData);
            if (response.status === 200) {
                toast(response?.data?.msg);
            }
            setProduct(() => {
                return {
                    productName: "",
                    catagory: "",
                    price: "",
                    description: ""
                }
            });
            setSelectedImage(null);
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data?.msg);
            }
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    }
    return (
        <div className='w-3/4 md:w-2/5 bg-white m-auto mt-4 rounded-lg'>
            <div className='w-full flex flex-col items-center py-4'>
                <form className='w-full flex flex-col items-center' onSubmit={handleSubmit}>
                    <div className='w-[90%]  flex flex-col justify-start'>
                        <label htmlFor='productName'>ProductName</label>
                        <input type='text' id='productName' name='productName' value={product.productName} onChange={handleChange} className=' bg-slate-200 p-1.5 border-none outline-none rounded-lg my-2' placeholder='Enter the product name...' />
                    </div>
                    <div className='w-[90%]  flex flex-col justify-start'>
                        <label htmlFor='catagory'>Catagory</label>
                        <select className=' bg-slate-200 p-1.5 border-none outline-none rounded-lg my-2' id='catagory' name='catagory' value={product.catagory} onChange={handleChange}>
                            <option value={"other"}>select catagory</option>
                            <option value={"fruits"}>Fruits</option>
                            <option value={"vegitable"}>Vegitable</option>
                            <option value={"electronics"}>Electronics</option>
                            <option value={"gadget"}>Gadgets</option>
                            <option value={"food"}>Food</option>
                            <option value={"furniture"}>Furniture</option>

                        </select>
                    </div>
                    <div className='w-[90%]  flex flex-col justify-start'>
                        <label htmlFor='productimage'>Image
                            <div className='w-full h-30 bg-slate-200 rounded-lg flex items-center justify-center cursor-pointer my-2' onChange={handleImageUpload} >
                                {
                                    selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt='productimage' className='w-[60%] object-cover h-full' /> :
                                        <CloudUploadOutlinedIcon sx={{ width: '60px', height: '60px' }} />
                                }
                                <input type='file' name='productimage' id='productimage' accept='image/*' className='hidden' />
                            </div>
                        </label>
                    </div>
                    <div className='w-[90%]  flex flex-col justify-start'>
                        <label htmlFor='price'>Price</label>
                        <input type='text' id='price' name='price' value={product.price} onChange={handleChange} className=' bg-slate-200 p-1.5 border-none outline-none rounded-lg my-2' placeholder='Enter the product price...' />
                    </div>
                    <div className='w-[90%]  flex flex-col justify-start'>
                        <label htmlFor='description'>Description</label>
                        <textarea rows={3} id='description' type='text' name='description' value={product.description} onChange={handleChange} className=' bg-slate-200 p-1.5 border-none resize-none outline-none rounded-lg my-2' placeholder='Product description...' />
                    </div>
                    <button type='submit' className='w-[40%] bg-slate-800 text-white text-lg hover:bg-slate-200 hover:text-slate-800 mt-2 py-2 rounded-full'>Save</button>
                </form>
            </div>
        </div>
    )
}

export default NewProduct