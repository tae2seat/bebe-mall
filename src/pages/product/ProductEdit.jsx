import React from 'react';
import Button from '../../components/buttons/Button';


export default function ProductEdit() {
    return (
        <div className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>상품 수정하기</h2>
            <section className='flex flex-col md:flex-row p-4'>
                <img className='w-full px-4 basis-7/12' />
                <div className='w-full basis-5/12 flex flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2 '>상품이름</h2>
                    <p className='text-2xl font-bold py-2 border-b border-gary-400'>가격</p>
                    <p className='text-lg py-4'>설명</p>
                    <div className='flex items-center'>
                        <label className='text-brand font-bold'>옵션</label>
                            {/* <select className='p-2 m-4 flex-1 text-center border-2 border-dashed border-brand outline-none' onChange={handleChangeOption}>
                                {options?.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select> */}
                    </div>
                    <Button text="장바구니에 추가"  />
                </div>
            </section>  
        </div>
    );
}

