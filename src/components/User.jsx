import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getProfile } from '../redux/slices/profileSlice';

export default function User() {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const {name, isLoading, isError} = useSelector((state) => state.profile)

    useEffect(() => {
        if(isLoggedIn){
            dispatch(getProfile())
        }
    }, [])

    const [profileImage, setProfileImage] = useState('')

    useEffect(() => {   
        getProfileImage()
    }, [])
    // CORS 문제가 일어남 
    const getProfileImage = async () => {
        try {
            const response = await axios.get('https://api.mybebe.net/api/v1/profile',{
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    // "Access-Control-Allow-Origin":"*"
                }
            })
            console.log(response.data.avatar)
            setProfileImage(response.data.avatar)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex items-center'>
            <img 
                className='w-10 h-10 rounded-full mr-2 hidden md:block' 
                src={profileImage} 
                alt='profile' 
            />
            <span className='hidden md:block'>{name}</span> 
        </div>
    );
}

