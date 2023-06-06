import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/slices/profileSlice';
import axios from 'axios';
import Button from '../components/buttons/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function UserProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const { name, email, gender, birthDate } = useSelector((state) => state.profile)

    const [profileImage, setProfileImage] = useState('')

    useEffect(() => {
        if(isLoggedIn){
            dispatch(getProfile())
        }
    },[isLoggedIn])

    useEffect(() => {
        getProfileImage()
    },[])

    const getProfileImage = async () => {
        try {
            const response = await axios.get('https://api.mybebe.net/api/v1/profile',{
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            setProfileImage(response.data.avatar)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickEdit = (e) => {
        navigate('/profile/edit')
    }
    

    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>User Profile</h2>
            <img 
                className='w-96 mx-auto mb-2'
                src={profileImage} 
                alt='profileImage' 
            />
            <div className='flex flex-col p-12'>
                <div className='p-4 outline-none border border-gray-300 my-1'>
                   <span className='text-lg'>이름 : {name}</span>
                </div>
                <div className='p-4 outline-none border border-gray-300 my-1'>
                   <span className='text-lg'>email : {email}</span>
                </div>
                <div className='p-4 outline-none border border-gray-300 my-1'>
                   <span className='text-lg'>성별 : {gender}</span>
                </div>
                <div className='p-4 outline-none border border-gray-300 my-1'>
                   <span className='text-lg'>생년월일 : {birthDate}</span>
                </div>
                <Button text='프로필 수정하기' onClick={handleClickEdit}/>
            </div>
        </section>
    );
}

