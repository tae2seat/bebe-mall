import React from "react";

export default function PriceCard({ text, price }) {
  return (
    <div className=" bg-gray-50 py-4 px-6 md:px-8 md:py-6 rounded-2xl text-center text-sm md:text-xl">
      <p className="truncate pb-1 md:pb-3">{text}</p>
      <p className="font-bold text-brand text-base md:text-2xl">{price}</p>
    </div>
  );
}
