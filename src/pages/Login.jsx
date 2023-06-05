import React, { useState } from 'react';
import Button from '../components/buttons/Button';
import { authApi } from '../axios/index';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authApi.post('/login',{
                email,
                password
            })
            console.log('성공!!')
            //스토리지에 저장하기 
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>로그인 하기</h2>
            <form className='flex flex-col p-12' onSubmit={handleSubmitLogin}>
                <input 
                    type='email'
                    name='이메일'
                    placeholder='이메일'
                    onChange={handleChangeEmail}
                />
                <input 
                    type='password'
                    name='비밀번호'
                    placeholder='비밀번호'
                    onChange={handleChangePassword}
                />
                <Button text='로그인하기' />
            </form>
        </div>
    );
}

