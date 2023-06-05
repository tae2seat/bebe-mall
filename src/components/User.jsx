import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function User() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const [profileImage, setProfileImage] = useState('')

    useEffect(() => {   
       if(isLoggedIn) {
        getProfileImage()
       }
    }, [])

    const getProfileImage = async () => {
        try {
            const response = await axios.get('https://api.mybebe.net/api/v1/profile',{
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
            <span className='hidden md:block'>사용자이름</span> 
        </div>
    );
}

