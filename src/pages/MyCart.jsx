import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import PriceCard from "../components/PriceCard";
import Button from "../components/buttons/Button";
import { Link } from "react-router-dom";

export default function MyCart() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      let sum = 0;
      for (const item of cartItems) {
        sum += item.price * item.quantity;
      }
      setTotalAmount(sum);
    };
    calculateTotalAmount();
  }, [cartItems]);

  const handleClickMinus = (product) => {
    let updatedCartItems = [...cartItems];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.option === product.option
    );

    if (existingItemIndex !== -1) {
      if (typeof updatedCartItems[existingItemIndex].quantity === "number") {
        updatedCartItems[existingItemIndex].quantity -= 1;
        if (updatedCartItems[existingItemIndex].quantity < 1) {
          updatedCartItems[existingItemIndex].quantity = 1;
        }
      } else {
        updatedCartItems[existingItemIndex.quantity] = 1;
      }
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleClickPlus = (product) => {
    let updatedCartItems = [...cartItems];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.option === product.option
    );
    if (existingItemIndex !== -1) {
      if (typeof updatedCartItems[existingItemIndex].quantity === "number") {
        updatedCartItems[existingItemIndex].quantity += 1;
      } else {
        updatedCartItems[existingItemIndex].quantity = 1;
      }
    } else {
      updatedCartItems = [
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleClickDelete = (product) => {
    const updatedCartItems = cartItems.filter(
      (item) =>
        item.id !== product.id ||
        (item.id === product.id && item.option !== product.option)
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  return (
    <section className="flex flex-col mx-auto md:w-1/2 text-center p-8">
      <h2 className="text-2xl font-bold py-8">나의 장바구니</h2>
      {cartItems.length === 0 ? (
        <div className="flex flex-col">
          <p className="py-8">
            장바구니가 비어있습니다. 상품을 추가해 주세요!{" "}
          </p>
          <Link
            to="/products"
            className="bg-[#9c7cab] text-white py-2 px-4 rounded-lg hover:brightness-110 "
          >
            상품 보러가기
          </Link>
        </div>
      ) : (
        <ul className="border-b border-gray-300 mb-8 p-4 px-8">
          {cartItems.map((product, id) => {
            return (
              <li key={id} className="flex justify-between my-4 items-center">
                <img src={product.image} className="w-24 md:w-48 rounded-lg" />
                <div className="flex-1 flex justify-between ml-4">
                  <div className="basis-3/5">
                    <p className="text-lg">{product.name}</p>
                    <p className="text-lg font-bold text-brand">
                      {product.option}
                    </p>
                    <p>{product.price}원</p>
                  </div>
                  <div className="flex text-2xl items-center">
                    <AiOutlineMinusSquare
                      className=" transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1"
                      onClick={() => handleClickMinus(product)}
                    />
                    <span>{product.quantity}</span>
                    <AiOutlinePlusSquare
                      className=" transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1"
                      onClick={() => handleClickPlus(product)}
                    />
                    <RiDeleteBin5Fill
                      className=" transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1"
                      onClick={() => handleClickDelete(product)}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-center items-center mb-6 p-4 md:px-8 lg:px-16 gap-2 md:gap-6">
            <PriceCard text="상품 총액" price={totalAmount} />
            <p className="p-1">+</p>
            <PriceCard text="배송액" price={"3000"} />
            <p className="p-1">=</p>
            <PriceCard text="총액" price={totalAmount + 3000} />
          </div>
          <Button text="주문하기" />
        </div>
      )}{" "}
    </section>
  );
  //로컬스토리지 사용, redux 상태관리를 하던가 , 서버랑 api 통신을 하던가
}

// shrink-o
