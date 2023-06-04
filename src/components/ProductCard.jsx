import React from 'react';

export default function ProductCard() {
    return (
        <li className='rounded-lg shadow-md overflow-hidden cursor-pointer'>
            <img className='w-full' />
            <div className='mt-2 px-2 text-lg flex justify-between items-center'>
                <h3 className='truncate'>타이틀</h3>
                <p>💰price</p>
            </div>
            <p className='mb-2 px-2 text-gray-600'>카테고리</p>
        </li>
    );
}

