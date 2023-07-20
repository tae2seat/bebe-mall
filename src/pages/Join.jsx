import React, { useState } from "react";
import Button from "../components/buttons/Button";
import { authApi } from "../axios";
import { useForm } from "react-hook-form";

export default function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const join = async (e) => {
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
    <div className="flex flex-col mx-auto md:w-1/3 text-center">
      <h2 className="text-2xl font-bold py-8">Bebe Mall 회원가입</h2>
      <form className="flex flex-col p-12" onSubmit={handleSubmit(join)}>
        <input
          type="text"
          {...register("name", {
            required: "이름은 필수 입력 사항입니다.",
          })}
          name="name"
          placeholder="이름"
          onChange={handleChangeName}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          type="email"
          {...register("email", {
            required: "이메일은 필수 입력 사항입니다.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
          name="email"
          placeholder="이메일"
          onChange={handleChangeEmail}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          {...register("password", {
            required: "비밀번호는 필수 입력 사항입니다.",
            minLength: { value: 8, message: "8글자 이상 써주세요." },
          })}
          name="password"
          placeholder="비밀번호"
          onChange={handleChangePassword}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          className=" text-gray-400"
          type="date"
          {...register("date", {
            required: "생년월일은 필수 입력 사항입니다.",
          })}
          name="birthDate"
          placeholder="생년월일"
          onChange={handleChangeBirthDate}
        />
        {errors.date && <p>{errors.date.message}</p>}
        <select
          className="p-4 outline-none border border-gray-300 my-1 text-gray-400"
          {...register("gender", {
            required: "성별은 필수 선택 사항입니다.",
          })}
          value={gender}
          onChange={handleChangeGender}
        >
          <option value="">Select gender</option>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
        <Button text="회원가입하기" />
      </form>
    </div>
  );
}
