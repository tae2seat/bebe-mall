import React from 'react';
import ProductCard from './ProductCard';

export default function Products() {
    //products 정보 받아 오기 
    // 로딩 중일 때 에러 뜰 때 경우 
    return (
        <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {/* products가 있으면 productCard를 보여주게끔  map해서  */}
            <ProductCard  />
        </ul>
    // products가 있으면 productCard를 보여주게끔 
)}

