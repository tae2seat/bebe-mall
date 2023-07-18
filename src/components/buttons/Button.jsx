import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-[#9c7cab] text-white py-2 px-4 rounded-lg hover:brightness-110 mt-8 "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
