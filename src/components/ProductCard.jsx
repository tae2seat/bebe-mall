import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({item}) {

    const navigate = useNavigate()

    const ProductId = item.id
    const categoryName = item.item_categories[0].category.name

    const handleClickProduct = () => {
        navigate(`/product/detail/${ProductId}`) // 각각 product로 옮겨지도록 해야함 
    }

    return (
        <li 
            onClick={handleClickProduct}
            className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 '>
            <img className='w-full' src={item.image} alt='productIamge'/>
            <div className='mt-2 px-2 text-lg flex justify-between items-center'>
                <h3 className='truncate'>{item.name}</h3>
                <p>{item.price}원</p>
            </div>
            <p className='mt-2 px-2 text-gray-600'>{categoryName}</p>
            <p className='mb-2 px-2 text-gray-600'>{item.description}</p>
        </li>
    );
}

