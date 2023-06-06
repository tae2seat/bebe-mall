import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs'
import babyFace from '../images/ICON_08.png'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/buttons/Button';
import User from './User';
import { authApi } from '../axios';
import { logout } from '../redux/slices/authSlice';


export default function Navbar() {

    const dispatch  = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const handleLogout = async (e) => {
        try {
            const response = await authApi.post('/logout', null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            dispatch(logout())
            localStorage.clear()
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = (e) => {
        navigate('/login')
    }

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand gap-2'>
                <img src={babyFace} alt='로고' className='flex items-center w-8 h-8' />
                <h1 className='hidden md:block'>Bebe</h1>
                <span>Mall</span>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products' className=''>Products</Link>
                <Link to='/carts'>Carts</Link>
                <Link to='/products/new' className='text-2xl'>
                    <BsFillPencilFill />
                </Link>
                { isLoggedIn && <Link to='/profile'><User /></Link> } 
                { isLoggedIn 
                    ?  <Button onClick={handleLogout} text='Logout' /> 
                    :  <Button onClick={handleLogin} text='Login' />  }          
            </nav>
        </header>
    );
}

