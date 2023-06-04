import React, { useState } from 'react';
import Button from '../../components/buttons/Button';

export default function NewProduct() {

    const [product, setProduct] = useState({}) //빈 오브젝트를 넣은 것 
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState();
    const [success, setSuccess] = useState();

    const handleChange = (e) => {
        const { name, value, files } = e.target; //e.target이 애초에 객체인 
        if(name === 'file') {
            setFile(files && files[0]) // && 둘다 true 일 때만 실행, || 둘중 하나라도 true면 true가 나옴 
            return;
            //formData로 대체할 수 있음 
        }
        setProduct((product) => ({...product, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //setIsUploading(true)
        //제품 사진을 업로드 하고 url 획득
        //새로운 제품 추가 
        //제품 추가 된 후 setSuccess('제품이 성공적으로 추가되었습니다.') setTimeout(()=> { setSuccess(null)},4000 )
        //최종적으로 setIsUploading(false)
    }



    return (
        <section className='w- full text-center'>
            <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
            { success && <p className='my-2'>👍 {success}</p>}
            { file &&( 
                <img 
                    className='w-96 mx-auto mb-2' 
                    src={URL.createObjectURL(file)} 
                    alt='file' 
                />
            )}
            <form className='flex flex-col p-12 ' onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept='image/*' 
                    name='file' 
                    required 
                    onChange={handleChange} 
                />
                <input 
                    type='text' 
                    name='title' 
                    value={product.title ?? ''} 
                    placeholder='제품명' 
                    required 
                    onChange={handleChange}/> 
                {/* ?? 앞에 것이 투루이면 실행 아니면 뒤에 것 실행  */}
                <input 
                    type='number' 
                    name='price' 
                    value={product.price ?? ''} 
                    placeholder='가격' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type='text' 
                    name='category' 
                    value={product.category ?? ''} 
                    placeholder='카테고리' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type='text' 
                    name='description' 
                    value={product.description ?? ''} 
                    placeholder='제품 설명' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type='text' 
                    name='option' 
                    value={product.option ?? ''} 
                    placeholder='옵션들' 
                    required 
                    onChange={handleChange}
                />
                <Button text={isUploading ? '업로드 중 ..' : '제품 등록하기'} disabled={isUploading} />
            </form>
        </section>
    );
}

