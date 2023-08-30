import Button from "../components/buttons/Button.jsx";
import { authApi } from "../axios/index.js";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface JoinForm {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  gender: string;
}

export default function Join(): ReactElement {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>({
    mode : "onChange"
  });


  const JoinForm: SubmitHandler<JoinForm> = async (data) => {
    try {
      const response = await authApi.post("/join", data);
      alert("회원가입이 완료되었습니다.")
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto md:w-[500px] text-center">
      <h2 className="text-2xl font-bold py-8">Bebe Mall 회원가입</h2>
      <form className="flex flex-col p-12" onSubmit={handleSubmit(JoinForm)}>
        <input
          type="text"
          {...register("name", {
            required: "이름은 필수 입력 사항입니다.",
          })}
          placeholder="이름"
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
        <input
          className=" text-gray-400"
          type="date"
          {...register("birthDate", {
            required: "생년월일은 필수 입력 사항입니다.",
          })}
          placeholder="생년월일"
        />
        {errors.birthDate && <p>{errors.birthDate.message}</p>}
        <select
          className="p-4 outline-none border border-gray-300 my-1 text-gray-400"
          {...register("gender", {
            required: "성별은 필수 선택 사항입니다.",
          })}
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
