import React, { useEffect, useState } from 'react';
import { RiDeleteBin5Fill} from 'react-icons/ri'
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import PriceCard from '../components/PriceCard';
import Button from '../components/buttons/Button';


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
        <section className='flex flex-col w-full text-center p-8'>
            <h2 className='text-2xl font-bold my-4'>나의 장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어있습니다. 상품을 추가해 주세요! </p>
            ) : (
                <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
                { cartItems.map((product, id) => {
                    return (
                        <li key={id} className='flex justify-between my-4 items-center'>
                            <img src={product.image} className='w-24 md:w-48 rounded-lg'/>
                            <div className='flex-1 flex justify-between ml-4'>
                                <div className='basis-3/5'>
                                    <p className='text-lg'>{product.name}</p>
                                    <p className='text-lg font-bold text-brand'>{product.option}</p>
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
            </ul>)}
            <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16 '>
                <PriceCard text='상품 총액' />
                + 
                <PriceCard text='배송액'/>
                =
                <PriceCard text='총액' />
            </div>
            <Button text='주문하기' />
        </section>
    );
    //로컬스토리지 사용, redux 상태관리를 하던가 , 서버랑 api 통신을 하던가 
}

// shrink-o