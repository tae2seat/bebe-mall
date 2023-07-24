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
      className="w-72 h-96 mx-auto rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mb-6 md:mb-12 "
    >
      <img
        className="h-2/3 mx-auto p-8 object-cover "
        src={item.image}
        alt="productImage"
      />
      <div className="pt-6 px-6 text-lg flex justify-between items-center">
        <h3 className="truncate">{item.name}</h3>
        <p>{item.price}원</p>
      </div>
      <p className="mt-2 px-6 text-gray-600 truncate">{categoryName}</p>
      <p className="mb-2 px-6 text-gray-600 truncate">{item.description}</p>
    </li>
  );
}
