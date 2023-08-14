import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/profileSlice";
import axios from "axios";
import basicImage from "../images/babyface_icon.png";

export default function User() {
  const dispatch = useDispatch();
  const { name, isLoading, isError } = useSelector((state) => state.profile);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    dispatch(getProfile());
    fetchProfileImage();
  }, []);

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
      setProfileImage(response.data.avatar);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center ">로딩중...</div>;
  }

  if (isError) {
    return <div className="flex items-center">Error!</div>;
  }

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {profileImage ? (
        <img
          className="rounded-full w-12 h-12 p-1 border border-gray-200"
          src={profileImage}
          alt="profile"
        />
      ) : (
        <img
          className="rounded-full w-10 h-10 p-1 border border-gray-200"
          src={basicImage}
          alt="basicImage"
        />
      )}
      <span className="hidden md:block">{name}</span>
    </div>
  );
}
