import React from 'react';

export default function User() {


    return (
        <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full mr-2' />
            <span className='hidden md:block'>사용자이름</span> 
        </div>
    );
}

