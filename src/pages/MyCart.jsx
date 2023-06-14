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
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === product.id) {
              const quantity = getItemQuantityFromLocalStorage(item.id); // 로컬 스토리지에서 해당 상품의 수량 가져오기
              return {
                ...item,
                quantity: quantity > 1 ? quantity - 1 : quantity,
              };
            }
            return item;
          });
          setCartItems(updatedCartItems);
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }
    const handleClickPlus = (product) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === product.id) {
              const quantity = getItemQuantityFromLocalStorage(item.id); // 로컬 스토리지에서 해당 상품의 수량 가져오기
              return {
                ...item,
                quantity: quantity + 1,
              };
            }
            return item;
          });
          setCartItems(updatedCartItems);
          localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }

    const getItemQuantityFromLocalStorage = (itemId) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find((item) => item.id === itemId);
        return item ? item.quantity : 0;
      };

    const handleClickDelete = (product) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== product.id)
        setCartItems(updatedCartItems)
        localStorage.setItem('cart', JSON.stringify(updatedCartItems))

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
                                    <AiOutlineMinusSquare onClick={() => handleClickMinus(product)} />
                                    <span>{String(product.quantity)}</span>
                                    <AiOutlinePlusSquare onClick={() => handleClickPlus(product)} />
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

