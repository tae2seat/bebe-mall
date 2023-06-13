import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Fill} from 'react-icons/ri'
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'

export default function MyCart() {

    const [cartItems, setCartItems] = useState([])


    console.log(cartItems)
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart)
    },[])

    const handleClickMinus = (e) => {

    }
    const handleClickPlus = (e) => {

    }
    const handleClickDelete = (product) => {
        const [cartItems, setCartItems] = useState([])

    }

    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>나의 장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어있습니다. 상품을 추가해 주세요! </p>
            ) : (
                <ul>
                { cartItems.map((product, index) => {
                    console.log(cartItems)
            
                    return (
                        <li key={index} className='flex'>
                            <img src={product.image}/>
                            <div className='flex'>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.option}</p>
                                <div className='flex'>
                                    <AiOutlineMinusSquare onClick={handleClickMinus} />
                                    <span>수량</span>
                                    <AiOutlinePlusSquare onClick={handleClickPlus} />
                                    <RiDeleteBin5Fill onClick={()=> handleClickDelete(product)} />
                                </div>
                            </div>
                        </li>
                    )
                })
                }
            </ul>
            )}
        </section>
    );
    //로컬스토리지 사용, redux 상태관리를 하던가 , 서버랑 api 통신을 하던가 
}

