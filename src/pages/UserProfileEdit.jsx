import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/profileSlice";
import Button from "../components/buttons/Button.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import { useForm } from "react-hook-form";

export default function UserProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, birthDate, gender, avatar, isLoading, isError } = useSelector(
    (state) => state.profile
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    dispatch(getProfile());
    setValue("name", name);
    setValue("gender", gender);
    setValue("birthDate", birthDate);
  }, [setValue, name, gender, birthDate]);

  const [newAvatar, setNewAvatar] = useState(null);

  const handleNewAvatarChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  const onSubmitAvatar = async (data, e) => {
    e.preventDefault();
    if (newAvatar) {
      const formData = new FormData();

      formData.append("file", newAvatar);

      try {
        const response = await axios.put(
          "https://api.tae2seat.com/api/v1/profile/avatar",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("사진 업로드 성공!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmitUserEdit = async (data) => {
    try {
      const response = await axios.put(
        "https://api.tae2seat.com/api/v1/profile/edit",
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("성공!!");
      if (response.status === 200) {
        alert("수정이 완료되었습니다.");
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <section className="mx-auto md:w-[500px] text-center">
      <h2 className="text-2xl font-bold py-8">User Profile Edit Page</h2>
      <form onSubmit={handleSubmit(onSubmitAvatar)}>
        {newAvatar ? (
          <img
            className="w-96 h-96 mx-auto mb-4 p-12 object-contain border  "
            src={URL.createObjectURL(newAvatar)}
            alt="profileImage"
          />
        ) : (
          <img
            className="w-96 h-96 mx-auto mb-4 p-12 object-contain  border "
            src={avatar}
            alt="avatar"
          />
        )}
        <div className="flex flex-col justify-center items-center">
          <input
            className="w-1/2 p-1"
            type="file"
            accept="image/*"
            onChange={handleNewAvatarChange}
          />
          <button className="text-gray-400 hover:underline hover:text-gray-800 py-2">
            이미지 수정하기
          </button>
        </div>
      </form>
      <form
        className="flex flex-col  p-8 md:p-12  gap-2"
        onSubmit={handleSubmit(handleSubmitUserEdit)}
      >
        <input
          {...register("name", {
            required: "이름은 필수 입력 사항입니다. ",
          })}
          type="text"
          defaultValue={name}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          {...register("birthDate", {
            required: "생년월일은 필수 입력 사항입니다.",
          })}
          type="date"
          defaultValue={birthDate}
        />
        {errors.birthDate && <p>{errors.birthDate.message}</p>}
        <select
          className="p-4 outline-none border border-gray-300 my-1 mb-8"
          {...register("gender", {
            required: "성별은 필수 입력 사항입니다.",
          })}
          defaultValue={gender}
        >
          <option value="">Select gender</option>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
        <Button text="수정완료하기" />
      </form>
    </section>
  );
}
