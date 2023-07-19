import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/profileSlice";
import Button from "../components/buttons/Button";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { name, gender, birthDate, avatar } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProfile());
    }
  }, [isLoggedIn]);

  const handleClickEdit = (e) => {
    navigate("/profile/edit");
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold py-8">User Profile Page</h2>
      {avatar ? (
        <img className="w-96 mx-auto p-12 " src={avatar} alt="profileImage" />
      ) : (
        <div className="w-96 mx-auto p-12 ">
          수정 페이지에서 이미지를 등록해주세요 ...{" "}
        </div>
      )}
      {/* 이미지가 없을 떄는 기본 이미지가 보이게끔 만들기  */}
      <div className="flex flex-col py-12 px-12 md:px-80">
        <div className="p-4 outline-none border border-gray-300 my-1">
          <span className="text-lg">이름 : {name}</span>
        </div>
        <div className="p-4 outline-none border border-gray-300 my-1">
          <span className="text-lg">성별 : {gender}</span>
        </div>
        <div className="p-4 outline-none border border-gray-300 my-1">
          <span className="text-lg">생년월일 : {birthDate}</span>
        </div>
      </div>
      <Button text="프로필 수정하기" onClick={handleClickEdit} />
    </section>
  );
}
