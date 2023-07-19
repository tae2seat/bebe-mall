import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/profileSlice";
import axios from "axios";

export default function User() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { name, isLoading, isError } = useSelector((state) => state.profile);

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProfile());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchProfileImage();
    //user에서 profileImage를 불러왔으니까 리덕스에 저장이 되어있기 때문에 다른 곳에서는 useSelector를 이용해서 한다.
  }, []);
  //CORS 문제가 일어남
  // 백엔드 헤더에 'Cross-origin-Resource-policy' 추가해야 됨
  const fetchProfileImage = async () => {
    try {
      const response = await axios.get(
        "https://api.mybebe.net/api/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data.avatar);
      setProfileImage(response.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred!</div>;
  }

  return (
    <div className="flex items-center">
      <img
        className="w-10 h-10 rounded-full mr-2"
        src={profileImage}
        alt="profile"
      />
      {/* 등록된 이미지 없으면 기본 이미지로 보이게끔  */}
      <span className="hidden md:block">{name}</span>
    </div>
  );
}
