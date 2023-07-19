import React, { useState } from "react";
import Button from "../components/buttons/Button";
import { authApi } from "../axios/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 중지시키는 메서드, 이룰 호출하면 이벤트에 대한 기본 동작이 실행되지 않고, 원하는 동작 수행 가능
    try {
      //try-catch 문을 사용하면 예기치 않은 상황이 발생할 때 모니커링 할 수 있고 적절하게 처리할 수 있음
      const response = await authApi.post("/login", {
        email,
        password,
      });
      //로컬스토리지에 저장하는 이유? 웹페이지를 새로 고침하거나 브라우저가 종료한 후에도 데이터가 유지되게 하기 위해
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      dispatch(login());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickJoin = (e) => {
    navigate("/join");
  };

  return (
    <div className="flex flex-col mx-auto md:w-1/2  text-center">
      <h2 className="text-2xl font-bold py-8">로그인 하기</h2>
      <form className="flex flex-col p-12" onSubmit={handleSubmitLogin}>
        <input
          type="email"
          name="이메일"
          placeholder="이메일"
          onChange={handleChangeEmail}
        />
        <input
          className="mb-6"
          type="password"
          name="비밀번호"
          placeholder="비밀번호"
          onChange={handleChangePassword}
        />
        <Button text="로그인하기" />
      </form>
      <button className="underline" onClick={handleClickJoin}>
        회원가입하기
      </button>
    </div>
  );
}
