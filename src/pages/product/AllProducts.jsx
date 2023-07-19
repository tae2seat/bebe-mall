import React from "react";
import Products from "../../components/Products";

export default function AllProducts() {
  return (
    <div className="flex flex-col mx-auto md:w-1/2 text-center">
      <h2 className=" text-2xl font bold py-8">제품 전체페이지</h2>
      <Products />
    </div>
  );
}
