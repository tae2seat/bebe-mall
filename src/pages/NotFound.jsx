import React from "react";
import Button from "../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import babyFoot from "../lottie/baby foot.json";

export default function NotFound() {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4 bg-[#faf3e1]">
      <div className="text-[#472f4e] text-2xl"> NotFound Page</div>
      <Lottie animationData={babyFoot} className="w-40 h-40" />
      <p className="text-[#472f4e] text-lg">home 버튼을 눌러주세요~!</p>
      <Button onClick={onClick} text={"Home"} />
    </div>
  );
}
