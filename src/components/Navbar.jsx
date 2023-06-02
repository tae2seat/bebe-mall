import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs'
import babyFace from '../images/ICON_08.png'
import { authApi } from '../axios';
import { useSelector } from 'react-redux';
import User from './User';

export default function Navbar() {

    const isLoggedIn = true

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand gap-2'>
                <img src={babyFace} alt='로고' className='flex items-center w-8 h-8' />
                <h1>Bebe Mall</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products' className=''>Products</Link>
                <Link to='/carts'>Carts</Link>
                <Link to='/products/new' className='text-2xl'>
                    <BsFillPencilFill />
                </Link>
                { isLoggedIn && <User /> } 
                { isLoggedIn ?  <button>Logout</button> :  <button>Login</button> }            </nav>
        </header>
    );
}

