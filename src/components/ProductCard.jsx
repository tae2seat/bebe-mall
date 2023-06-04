import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard() {

    const navigate = useNavigate()

    const handleClickProduct = () => {
        navigate('/') // 각각 product로 옮겨지도록 해야함 
    }

    return (
        <li 
            onClick={handleClickProduct}
            className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 '>
            <img className='w-full' 
        />
            <div className='mt-2 px-2 text-lg flex justify-between items-center'>
                <h3 className='truncate'>타이틀</h3>
                <p>💰price</p>
            </div>
            <p className='mb-2 px-2 text-gray-600'>카테고리</p>
        </li>
    );
}

