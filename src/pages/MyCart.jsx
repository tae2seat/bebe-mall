import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Fill} from 'react-icons/ri'
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'
import { useSelector } from 'react-redux';


export default function MyCart() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
       if(isLoggedIn){
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart)
       }
    },[isLoggedIn])

    const handleClickMinus = (product) => {
        let updatedCartItems = [...cartItems]
        const existingItemIndex = cartItems.findIndex(
            (item) => item.id === product.id && item.option === product.option
        )

        if(existingItemIndex !== -1) {
            if(typeof updatedCartItems[existingItemIndex].quantity === 'number'){
                updatedCartItems[existingItemIndex].quantity -= 1
                if(updatedCartItems[existingItemIndex].quantity < 1){
                    updatedCartItems[existingItemIndex].quantity = 1
                }
            } else {
                updatedCartItems[existingItemIndex.quantity] = 1
            }
        }
        setCartItems(updatedCartItems)
        localStorage.setItem('cart', JSON.stringify(updatedCartItems))
    }

    const handleClickPlus = (product) => {
        let updatedCartItems = [...cartItems]
        const existingItemIndex = cartItems.findIndex(
            (item) => item.id === product.id && item.option === product.option
        )
        if(existingItemIndex !== -1) {
            if(typeof updatedCartItems[existingItemIndex].quantity === 'number'){
                updatedCartItems[existingItemIndex].quantity += 1
            } else {
                updatedCartItems[existingItemIndex].quantity = 1
            }
        } else {
            updatedCartItems = [
                ...cartItems,
                {
                    ...product,
                    quantity: 1
                }
            ]
        }
        setCartItems(updatedCartItems)
        localStorage.setItem('cart', JSON.stringify(updatedCartItems))
    }

    const handleClickDelete = (product) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.id !== product.id || (item.id === product.id && item.option !== product.option)
        )
        setCartItems(updatedCartItems)
        localStorage.setItem('cart', JSON.stringify(updatedCartItems))
    };
    

    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>나의 장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어있습니다. 상품을 추가해 주세요! </p>
            ) : (
                <section className=''>
                { cartItems.map((product, id) => {
                    console.log(product)
                    return (
                        <li key={id} className='flex justify-between my-2 items-center'>
                            <img src={product.image} className='w-24 md:w-48 rounded-lg'/>
                            <div className='flex-1 flex justify-between ml-4'>
                                <div className='basis-3/5'>
                                    <p className='text-lg'>{product.name}</p>
                                    <p className='text-xl font-bold text-brand'>{product.option}</p>
                                    <p >{product.price}원</p>
                                </div>
                                <div className='flex text-2xl items-center'>
                                    <AiOutlineMinusSquare className=' transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1' onClick={() => handleClickMinus(product)} />
                                    <span>{product.quantity}</span>
                                    <AiOutlinePlusSquare  className=' transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1' onClick={() => handleClickPlus(product)} />
                                    <RiDeleteBin5Fill  className=' transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1' onClick={()=> handleClickDelete(product)} />
                                </div>
                            </div>
                        </li>
                    )
                })
                }
            </section>
            )}
        </section>
    );
    //로컬스토리지 사용, redux 상태관리를 하던가 , 서버랑 api 통신을 하던가 
}

