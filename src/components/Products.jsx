import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Products() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      getProducts();
    }
  }, [isLoggedIn]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.mybebe.net/api/v1/mall/item",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 로딩 중일 때 에러 뜰 때 경우
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-20">
      {products.items?.map((item, id) => (
        <ProductCard key={id} item={item} />
      ))}
    </ul>
    // products가 있으면 productCard를 보여주게끔
  );
}
