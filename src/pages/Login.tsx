import React, { ReactElement } from "react";
import Button from "../components/buttons/Button";
import { authApi } from "../axios/index";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks.js";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login(): ReactElement {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await authApi.post("/login", data);
      const { isAdmin, userRole } = response.data;
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("userRole", userRole);
      dispatch(login({ isAdmin: true, userRole: "admin" }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/join");
  };

  return (
    <div className="mx-auto md:w-[500px] text-center">
      <h2 className="text-2xl font-bold py-8">로그인 하기</h2>
      <form className="flex flex-col p-12" onSubmit={handleSubmit(handleLogin)}>
        <input
          type="email"
          {...register("email", {
            required: "이메일은 필수 입력 사항입니다.",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
          placeholder="이메일"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          {...register("password", {
            required: "비밀번호는 필수 입력 사항입니다.",
            minLength: { value: 8, message: "8글자 이상 써주세요." },
          })}
          placeholder="비밀번호"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <Button text="로그인하기" />
      </form>
      <button className="underline" onClick={handleClickJoin}>
        회원가입하기
      </button>
    </div>
  );
}
