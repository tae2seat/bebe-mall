import React, { useState } from 'react';
import Button from '../../components/buttons/Button';

export default function ProductDetail() {

    const handleClick = (e) => {
        //장바구니에 추가 
    }

    // const [selected, setSelected] = useState(option && option[0]);

    // const handleSelect = (e) => setSelected(e.target.value)

    return (
        <>
            <p className='mx-12 mt-4 text-gray-700'>카테고리</p>
            <section className='flex flex-col md:flex-row p-4'>
                <img className='w-full px-4 basis-7/12' />
                <div className='w-full basis-5/12 flex flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2 '>제품명</h2>
                    <p className='text-2xl font-bold py-2 border-b border-gary-400'>price</p>
                    <p className='text-lg py-4'>description</p>
                    <div className='flex items-center'>
                        <label className='text-brand font-bold' htmlFor='select'>옵션:</label>
                        {/* <select  
                                className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
                        onChange={handleSelect} value={selected}>
                            { options && options.map((option, index) => <option key={index}>option</option> )}
                        </select> */}
                    </div>
                </div>
            </section>
            <Button text="장바구니에 추가" onClick={handleClick}/>
        </>
    );
}

