import React from 'react'
import axios from "axios"
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const UpdateAndDelete = ({ id, onDelete }) => {
    const navigate = useNavigate();
    const handleUpdateItem = () => {
        navigate(`/update/${id}`)
    }

    const handleDeleteItem = async () => {
        const productId = id
        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/product/delete/${productId}`)
            if (res?.data?.status === 200) {
                toast('Item deleted successfully')
            }
            onDelete();
        } catch (error) {
            toast(error?.res?.data?.msg)
        }
    }
    return (
        <div className='flex gap-2'>
            <button className='bg-slate-700 w-[70px] p-1.5 rounded-full text-white my-1.5 hover:bg-slate-200 hover:text-black' onClick={handleUpdateItem}>Update</button>
            <button className='bg-red-700 w-[70px] p-1.5 rounded-full text-white my-1.5 hover:bg-slate-200 hover:text-black' onClick={handleDeleteItem}>Delete</button>
        </div>
    )
}

export default UpdateAndDelete