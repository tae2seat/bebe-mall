import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/buttons/Button';

export default function ProductEdit() {

    const { id } = useParams()

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const [product, setProduct] = useState('')
    const [categories, setCategories] = useState([])

    const [newFile, setNewFile] = useState(product.image || '')
    const [productEditName, setProductEditName] = useState(product.name || '')
    const [editPrice, setEditPrice] = useState(product.price || '')
    const [editCategory, setEditCategory] = useState(product.cId || '')
    const [editDescription, setEditDescription] = useState(product.description || '')

    const handleChangeEditFile = (e) => {
        const newFile = e.target.files[0]
        setNewFile(newFile)
    }

    const handleChangeEditProductName = (e) => {
        setProductEditName(e.target.value)
    }

    const handleChangeEditPrice = (e) => {
        setEditPrice(e.target.value)
    }

    const handleChangeEditCategory = (e) => {
        setEditCategory(e.target.value)
    }

    const handleChangeEditDescription = (e) => {
        setEditDescription(e.target.value)
    }
 
    useEffect(() => {
        if(isLoggedIn) {
            getProductDetail()
            getCategory()
        }
    },[isLoggedIn])

    const getProductDetail = async () => {
        try {
            const response = await axios.get(`https://api.mybebe.net/api/v1/mall/item/${id}`,{
                headers :{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setProduct(response.data)          
        } catch (error) {
            console.log(error)
        }
    }

    const getCategory = async () => {
        try {
            const response = await axios.get('https://api.mybebe.net/api/v1/mall/category',{
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setCategories(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitEditProduct = (e) => {
        e.preventDefault()
    }



    return (
        <section className='w-full text-center'>
            <h2 className='text-2xl font bold my-4'>제품 수정 후 등록</h2>
            { newFile ? (
                <img 
                className='w-96 mx-auto mb-2' 
                src={URL.createObjectURL(newFile)} 
                alt='file' />
            ) : (
                <img
                    className='w-96 mx-auto mb-2'
                    src={product.image}
                    alt='file'
                />
            )}
            <form className='flex flex-col p-12' onSubmit={handleSubmitEditProduct}>
                <input
                    type='file'
                    accept='image/*'
                    name='file'
                    defaultValue={product.image || ''}
                    required
                    onChange={handleChangeEditFile}
                />
                <input 
                    type='text'
                    name='제품명'
                    defaultValue={product.name || ''}
                    required
                    onChange={handleChangeEditProductName}
                />
                <input 
                    type='number' 
                    name='price' 
                    defaultValue={product.price || ''} 
                    required 
                    onChange={handleChangeEditPrice}
                />
                <div className='p-4 outline-none border border-gray-300 my-1 text-left'>
                    <label className='text-gray-400'>카테고리</label>
                    <select className='ml-3 text-center'>
                        {categories?.map((category) => (
                            <option key={category.id} onChange={handleChangeEditCategory} defaultValue={editCategory === category.id}> 
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <input 
                    type='text'
                    name='description'
                    defaultValue={product.description || ''}
                    required
                    onChange={handleChangeEditDescription}
                />
                <Button text='제품 수정하기' />
            </form>
        </section>
        
    );
}

