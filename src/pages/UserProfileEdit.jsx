import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/slices/profileSlice";
import Button from "../components/buttons/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

export default function UserProfileEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { name, birthDate, gender, avatar, isLoading, isError } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProfile());
    }
  }, [isLoggedIn]);

  const [newName, setNewName] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);

  const handleChangeNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNewBirthDate = (e) => {
    setNewBirthDate(e.target.value);
  };
  const handleChangeNewGender = (e) => {
    setNewGender(e.target.value);
  };

  const handleChangeNewProfileImage = (e) => {
    setNewProfileImage(e.target.files[0]);
  };

  const handleSubmitUserEdit = async (e) => {
    e.preventDefault();
    // 수정하고 submit 했을 때 에러나는 이유 : 수정하지 않으면 기존 값을 반영하고 수정했으면 수정한 값을 반영
    const editedName = newName === "" ? name : newName;
    const editedBirthDate = newBirthDate === "" ? birthDate : newBirthDate;
    const editedGender = newGender === "" ? gender : newGender;

    const formData = new FormData();

    formData.append("file", newProfileImage);
    formData.append("name", editedName);
    formData.append("birthDate", editedBirthDate);
    formData.append("gender", editedGender);

    try {
      const response = await axios.put(
        "https://api.mybebe.net/api/v1/profile/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("성공!!");
      navigate("/profile");
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
    <section className="flex flex-col mx-auto md:w-1/2 text-center">
      <h2 className="text-2xl font-bold py-8">User Profile Edit Page</h2>
      <form>
        {newProfileImage ? (
          <img
            className="w-96 mx-auto p-12 object-contain "
            src={URL.createObjectURL(newProfileImage)}
            alt="profileImage"
          />
        ) : (
          <img
            className="w-96 mx-auto p-12 object-contain "
            src={avatar}
            alt="avatar"
          />
        )}
        <input
          className="w-2/3 p-1"
          type="file"
          accept="image/*"
          onChange={handleChangeNewProfileImage}
        />
      </form>
      <form className="flex flex-col p-12" onSubmit={handleSubmitUserEdit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          defaultValue={name}
          onChange={handleChangeNewName}
        />
        <input
          type="date"
          name="birthDate"
          placeholder="생년월일"
          defaultValue={birthDate}
          onChange={handleChangeNewBirthDate}
        />
        <input
          className="mb-6"
          type="text"
          name="gender"
          placeholder="성별"
          defaultValue={gender}
          onChange={handleChangeNewGender}
        />
        <Button text="수정완료하기" />
      </form>
    </section>
  );
}
