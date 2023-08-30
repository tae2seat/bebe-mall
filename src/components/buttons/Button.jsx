import React from "react";

export default function Button({ text, onClick = null }) {
  return (
    <button
      className="bg-[#9c7cab] text-white py-2 px-4 rounded-lg hover:brightness-110"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
