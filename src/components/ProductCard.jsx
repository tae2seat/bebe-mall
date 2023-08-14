import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const navigate = useNavigate();

  const ProductId = item.id;
  const categoryName = item.item_categories[0].category.name;

  const handleClickProduct = () => {
    navigate(`/product/detail/${ProductId}`); // 각각 product로 옮겨지도록 해야함
  };

  return (
    <li
      onClick={handleClickProduct}
      className="w-72 mx-auto rounded-lg p-6 shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 "
      // className="w-72 h-96 mx-auto rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mb-6 md:mb-12 "
    >
      <img
        className="w-60 h-60 object-cover rounded-lg "
        src={item.image}
        alt="productImage"
      />
      <div className="text-start truncate mt-4">
        <h3 className="text-xl">{item.name}</h3>
        <p className="text-lg">{item.price}원</p>
        <p className="text-sm text-gray-600 ">{categoryName}</p>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </li>
  );
}
