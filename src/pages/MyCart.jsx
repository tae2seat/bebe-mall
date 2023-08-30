import React, { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import PriceCard from "../components/PriceCard";
import Button from "../components/buttons/Button.jsx";
import { Link } from "react-router-dom";

export default function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

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
    <section className="mx-auto md:w-1/2 text-center p-8">
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
        <ul className="flex flex-col items-center gap-6 border-b border-gray-300 p-8">
          {cartItems.map((product, id) => {
            return (
              <li key={id} className="flex justify-between items-center w-full">
                <img
                  src={product.image}
                  className="w-20 h-20 md:w-40 md:h-40 rounded-sm"
                />
                <div>
                  <p className="text-xl">{product.name}</p>
                  <p className="text-sm md:py-2">{product.option}</p>
                  <p>{product.price}원</p>
                </div>

                <div className="flex items-center gap-1 md:gap-2 md:text-lg">
                  <AiOutlineMinusSquare
                    className="transition-all cursor-pointer hover:text-brand hover:scale-105"
                    onClick={() => handleClickMinus(product)}
                  />
                  <span>{product.quantity}</span>
                  <AiOutlinePlusSquare
                    className="transition-all cursor-pointer hover:text-brand hover:scale-105"
                    onClick={() => handleClickPlus(product)}
                  />
                  <RiDeleteBin5Fill
                    className="transition-all cursor-pointer hover:text-brand hover:scale-105"
                    onClick={() => handleClickDelete(product)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-center gap-6 border-b border-gray-300 p-8 ">
          <div className="flex justify-between w-full items-center gap-2 ">
            <PriceCard text="상품 총액" price={totalAmount} />
            <p>+</p>
            <PriceCard text="배송액" price={"3000"} />
            <p>=</p>
            <PriceCard text="총액" price={totalAmount + 3000} />
          </div>
          <Button
            text="주문하기"
            onClick={() => {
              alert("주문이 완료되었습니다.");
            }}
          />
        </div>
      )}{" "}
    </section>
  );
  //로컬스토리지 사용, redux 상태관리를 하던가 , 서버랑 api 통신을 하던가
}

// shrink-o
