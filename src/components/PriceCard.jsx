import React from "react";

export default function PriceCard({ text, price }) {
  return (
    <div className="flex flex-col justify-center bg-gray-50 rounded-2xl w-24 h-20 md:w-32 md:h-28 ">
      <p className="truncate md:text-lg mt-2">{text}</p>
      <p className="truncate font-bold text-brand m-2">{price}</p>
    </div>
  );
}
