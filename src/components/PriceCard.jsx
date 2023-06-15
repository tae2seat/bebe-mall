import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function PriceCard({text}) {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    return (
        <div className='bg-gray-50 p-8 mx-2 rounded-2xl text-center text-lg md:text-xl'>
            <p>{text}</p>
            <p className='font-bold text-brand text-xl md:text-2xl'>10000원</p>
        </div>
    );
}

