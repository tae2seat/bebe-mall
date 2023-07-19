import React, { useState } from "react";
import Button from "../components/buttons/Button";
import { authApi } from "../axios";

export default function Join() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };
  const handleChangeBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/join", {
        name,
        email,
        password,
        gender,
        birthDate,
      });
      console.log("성공!!", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col mx-auto md:w-1/2 text-center">
      <h2 className="text-2xl font-bold py-8">Bebe Mall 회원가입</h2>
      <form className="flex flex-col p-12" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleChangeName}
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChangePassword}
        />
        <input
          type="date"
          name="birthDate"
          placeholder="생년월일"
          onChange={handleChangeBirthDate}
        />
        <input
          className="mb-6"
          type="text"
          name="gender"
          placeholder="성별  ex)여자,님지"
          onChange={handleChangeGender}
        />
        <Button text="회원가입하기" />
      </form>
    </div>
  );
}
